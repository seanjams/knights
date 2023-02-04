from typing import Tuple

def in_range(x: int):
    return x in range(0,8)

def available_moves(i: int, j: int):
    moves = []
    for x in [-2, 2]:
        for y in [-1, 1]:
            if in_range(i + x) and in_range(j + y):
                moves.append((i + x, j + y))
            if in_range(i + y) and in_range(j + x):
                moves.append((i + y, j + x))
    return moves

def number_of_moves_between(i: int, j: int):
    start = (i, j, 0)
    seen_moves = []
    unseen_moves = [start]

    def strip_move_count(moves):
        return [(move[0], move[1]) for move in moves]

    def add_move_count(moves, move_count):
        return [(move[0], move[1], move_count) for move in moves]

    while len(seen_moves) < 64:
        move = unseen_moves.pop(0)
        seen_moves.append(move)
        move_count = move[2]

        potential_moves = available_moves(move[0], move[1])
        potential_moves = list(set(potential_moves) - set(strip_move_count(seen_moves)))
        potential_moves = list(set(potential_moves) - set(strip_move_count(unseen_moves)))

        next_moves = add_move_count(potential_moves, move_count + 1)
        unseen_moves =  unseen_moves + next_moves

    return {f"{move[0]},{move[1]}": move[2] for move in seen_moves}

def generate_board(starting_point: Tuple[int, int]):
    moves = number_of_moves_between(starting_point[0], starting_point[1])

    def print_row(i: int):
        row = ""
        for j in range(0, 8):
            move_count = moves[f"{i},{j}"]
            if (i, j) == starting_point:
                move_count = "X"
            row += f"| {move_count} "
        row += "|"
        print(row)

    def print_line():
        print("---------------------------------")
    
    for row_index in range(0, 8):
        print_line()
        print_row(row_index)
    print_line()
    
# tests
assert in_range(-1) is False # false
assert in_range(0) is True
assert in_range(4) is True
assert in_range(7) is True
assert in_range(9) is False

assert available_moves(0, 0) == [(2, 1), (1, 2)] # corner
assert available_moves(1, 6) == [(0, 4), (2, 4), (3, 5), (3, 7)] # almost corner
assert available_moves(3, 3) == [(1, 2), (2, 1), (1, 4), (4, 1), (5, 2), (2, 5), (5, 4), (4, 5)] # middle of board

assert number_of_moves_between(0, 0)["1,2"] == 1
assert number_of_moves_between(2, 1)["4,1"] == 2
assert number_of_moves_between(0, 0)["7,7"] == 6

generate_board((0, 0))
        
