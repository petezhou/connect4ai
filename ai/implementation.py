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
                      verbose=True):
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


def open_three_in_row(board, threes):
    cols = [i[1] for i in threes]
    rows = [i[0] for i in threes]
    maxCol = max(cols)
    minCol = min(cols)
    maxRow = max(rows)
    minRow = min(rows)

    # don't deal with vertical
    if maxCol == minCol:
        return -1

    if maxRow == minRow:
        # horizontal three-in-row
        if maxCol < 6:
            if board.get_cell(maxRow, maxCol + 1) == 0:
                return maxRow
        elif minCol > 0:
            if board.get_cell(maxRow, minCol - 1) == 0:
                return maxRow

    else:
        # diagonal three-in-row
        if (threes[0][0] < threes[1][0] and threes[0][1] < threes[1][1]) or (threes[0][0] > threes[1][0] and threes[0][1] > threes[1][1]):
            # x
            #   X
            if minCol > 0 and minRow > 0:
                if board.get_cell(minRow - 1, minCol - 1) == 0:
                    return minRow - 1
            elif maxCol < 6 and maxRow < 5:
                if board.get_cell(maxRow + 1, maxCol + 1) == 0:
                    return maxRow + 1
        else:
            #   x
            # x
            if minCol > 0 and maxRow < 5:
                if board.get_cell(maxRow + 1, minCol - 1) == 0:
                    return maxRow + 1
            elif maxCol < 6 and minRow > 0:
                if board.get_cell(minRow - 1, maxCol + 1) == 0:
                    return minRow - 1

    return -1


def better_evaluate(board):
    score = 0
    if board.is_game_over():
        score = -(3000 - board.num_tokens_on_board() * 4)
    else:
        if board.longest_chain(board.get_current_player_id()) >= 4:
            score = 3000 - board.num_tokens_on_board() * 4
        else:
            ''' 
            The worst opening theory in the world 
            concerned with staking out space in the center
            hate edges in the first 10 moves
            '''

            # I hate edges!
            if board.num_tokens_on_board() < 7:
                if board.get_cell(5, 3) == board.get_current_player_id():
                    score += 300
                if board.get_cell(4, 3) == board.get_current_player_id():
                    score += 250
                if board.get_cell(3, 3) == board.get_current_player_id():
                    score += 300
                if board.get_cell(2, 3) == board.get_current_player_id():
                    score += 250
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

            # prefer clusters in the middle
            if board.num_tokens_on_board() < 14:
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
            other_trees = list(filter(lambda x: len(x) == 3, board.chain_cells(board.get_other_player_id())))
            my_open = []
            other_open = []
            for t in threes:
                r = open_three_in_row(board, t)
                if r > 0:
                    my_open.append(r)
            for ot in other_trees:
                r = open_three_in_row(board, ot)
                if r > 0:
                    other_open.append(r)

            # deep theory
            if board.get_current_player_id() == 1:
                for t in my_open:
                    if t == 3:
                        score += 500
                    elif t == 1:
                        score += 200
                    else:
                        score += 20
                for ot in other_open:
                    if ot == 4:
                        score -= 305
                    elif ot == 2:
                        score -= 140
                    elif ot == 0:
                        score -= 95
                    else:
                        score -= 30
            else:
                for t in my_open:
                    if t == 4:
                        score += 305
                    elif t == 2:
                        score += 140
                    elif t == 0:
                        score += 95
                    else:
                        score += 20
                for ot in other_open:
                    if ot == 3:
                        score -= 500
                    elif ot == 1:
                        score -= 200
                    else:
                        score -= 30

    return score


better_evaluate = memoize(better_evaluate)


# A player that uses alpha-beta and better_evaluate:
def my_player(board):
    return run_search_function(board, search_fn=alpha_beta_search, eval_fn=better_evaluate, timeout=5)


my_player = lambda board: alpha_beta_search(board, depth=4, eval_fn=better_evaluate)
