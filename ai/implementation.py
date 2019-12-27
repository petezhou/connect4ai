"""
This is the only file you should change in your submission!
"""
from basicplayer import get_all_next_moves, is_terminal
from util import memoize, run_search_function, INFINITY, NEG_INFINITY


def alpha_beta_find_board_value(board, depth, eval_fn, is_max, alpha, beta,
                                get_next_moves_fn=get_all_next_moves,
                                is_terminal_fn=is_terminal):

    if is_terminal_fn(depth, board):
        return eval_fn(board)

    best_val = None

    for move, new_board in get_next_moves_fn(board):
        val = -1 * alpha_beta_find_board_value(new_board, depth - 1, eval_fn, -1 * is_max, -1 * alpha, -1 * beta,
                                               get_next_moves_fn, is_terminal_fn)

        if best_val is None or val > best_val:
            best_val = val

        # some pruning here
        if is_max == 1:  # maximize utility
            if best_val > alpha:
                alpha = best_val
            if alpha >= beta:
                break
        else:
            if best_val > beta: # no flip because of our -1 * val flippity doo
                beta = best_val
            if beta >= alpha:
                break

    return best_val


def alpha_beta_search(board, depth,
                      eval_fn,
                      get_next_moves_fn=get_all_next_moves,
                      is_terminal_fn=is_terminal,
                      verbose=False):
    best_val = None

    alpha = NEG_INFINITY
    beta = INFINITY

    for move, new_board in get_next_moves_fn(board):
        val = -1 * alpha_beta_find_board_value(new_board, depth - 1, eval_fn, 1, alpha, beta,
                                               get_next_moves_fn,
                                               is_terminal_fn)

        if best_val is None or val > best_val[0]:
            best_val = (val, move, new_board)

    if verbose:
        print("Alpha Beta: Decided on column {} with rating {}".format(best_val[1], best_val[0]))

    return best_val[1]


def check_if_three_hor_open(board, threes):
    # a little short on time so only checking open ranks for now
    theRow = threes[0][0]
    for t in threes:
        if t[0] != theRow:
            False

    cols = [i[0] for i in threes]
    bigCol = max(cols)
    smolCol = min(cols)

    if bigCol < 6:
        if board.get_cell(theRow, bigCol + 1) == 0:
            return True
    elif smolCol > 0:
        if board.get_cell(theRow, smolCol - 1) == 0:
            return True
    else:
        return False


def better_evaluate(board):
    score = 0
    if board.is_game_over():
        score = -(1000 - board.num_tokens_on_board())
    else:
        if board.longest_chain(board.get_current_player_id()) >= 4:
            score = 1000 - board.num_tokens_on_board()
        else:
            ''' 
            The worst opening theory in the world 
            concerned with staking out space in the center
            hate edges in the first 10 moves
            '''
            if board.get_cell(5,3) == board.get_current_player_id():
                score += 40
            if board.get_cell(4, 3) == board.get_current_player_id():
                score += 40
            if board.get_cell(3, 3) == board.get_current_player_id():
                score += 15

            # I hate edges!
            if board.num_tokens_on_board() < 10:
                for row in range(6):
                    if board.get_cell(row, 0) == board.get_current_player_id():
                        score -= 25
                    if board.get_cell(row, 6) == board.get_current_player_id():
                        score -= 10
                    if board.get_cell(row, 1) == board.get_current_player_id():
                        score -= 25
                    if board.get_cell(row, 5) == board.get_current_player_id():
                        score -= 10

            # Prefer having your pieces in the center of the board.
            for row in range(6):
                for col in range(7):
                    if board.get_cell(row, col) == board.get_current_player_id():
                        score -= abs(3 - col)
                    elif board.get_cell(row, col) == board.get_other_player_id():
                        score += abs(3 - col)

            '''
            Game strategy
            '''
            # prefer clusters in the middle
            for row in range(2, 5):
                for col in range(3):
                    if board.get_cell(row - 1, col) == board.get_current_player_id():
                        score += 4
                    if board.get_cell(row - 1, col - 1) == board.get_current_player_id():
                        score += 4
                    if board.get_cell(row, col - 1) == board.get_current_player_id():
                        score += 4
                    if board.get_cell(row + 1, col - 1) == board.get_current_player_id():
                        score += 4
                    if board.get_cell(row + 1, col) == board.get_current_player_id():
                        score += 4
                    if board.get_cell(row + 1, col + 1) == board.get_current_player_id():
                        score += 4
                    if board.get_cell(row, col + 1) == board.get_current_player_id():
                        score += 4
                    if board.get_cell(row - 1, col + 1) == board.get_current_player_id():
                        score += 4

            # chase wins by getting 3 in a rows that are still open
            threes = list(filter(lambda x: len(x) == 3, board.chain_cells(board.get_current_player_id())))
            otherTrees = list(filter(lambda x: len(x) == 3, board.chain_cells(board.get_other_player_id())))
            numMyOpen = 0
            numOtherOpen = 0

            for t in threes:
                if check_if_three_hor_open(board, t):
                    numMyOpen += 1
            for ot in otherTrees:
                if check_if_three_hor_open(board, ot):
                    numOtherOpen += 1

            score = score + (numMyOpen * 20 - numOtherOpen * 40)

    return score


better_evaluate = memoize(better_evaluate)


# A player that uses alpha-beta and better_evaluate:
def my_player(board):
    return run_search_function(board, search_fn=alpha_beta_search, eval_fn=better_evaluate, timeout=5)


my_player = lambda board: alpha_beta_search(board, depth=4, eval_fn=better_evaluate)
