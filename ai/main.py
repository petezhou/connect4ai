import flask
from flask import request
import json

from connectfour import ConnectFourBoard
from implementation import my_player

app = flask.Flask("__main__")


@app.route("/")
def my_index():
    return flask.render_template("index.html")


@app.route("/test")
def testing():
    return "hello world!"


@app.route("/ai", methods=["POST"])
def make_ai_move():

    json_form = json.loads(list(request.form.copy().to_dict().keys())[0])

    if json_form["turn"] == "red":
        move = 1
    else:
        move = 2

    board = json_form["board"]
    for i in range(len(board)):
        for j in range(len(board[0])):
            if not board[i][j]:
                board[i][j] = 0
            elif board[i][j] == "red":
                board[i][j] = 1
            elif board[i][j] == "yellow":
                board[i][j] = 2

    board_tuples = tuple(tuple(x) for x in board)
    cur_pos = ConnectFourBoard(board_array=board_tuples, current_player=move)
    ai_play = my_player(cur_pos)

    return str(ai_play)


app.run()
