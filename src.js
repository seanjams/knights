const inRange = (x) => {
  return x >= 0 && x < 8;
};

const availableMoves = (i, j) => {
  const moves = [];
  for (let x of [-2, 2]) {
    for (let y of [-1, 1]) {
      if (inRange(i + x) && inRange(j + y)) {
        moves.push([i + x, j + y]);
      }
      if (inRange(i + y) && inRange(j + x)) {
        moves.push([i + y, j + x]);
      }
    }
  }
  return moves;
};

const generateNumberOfMoves = (i, j) => {
  const start = [i, j, 0];
  const seen_moves = [];
  const unseen_moves = [start];
  const result = {};

  while (seen_moves.length < 64) {
    const move = unseen_moves.shift();
    seen_moves.push(move);
    const move_count = move[2];

    result[`${move[0]},${move[1]}`] = move_count;

    let potential_moves = availableMoves(move[0], move[1]);
    potential_moves = potential_moves.filter(([x1, y1]) => {
      return !seen_moves
        .concat(unseen_moves)
        .some(([x2, y2]) => x1 === x2 && y1 === y2);
    });

    const next_moves = potential_moves.map((move) => [
      move[0],
      move[1],
      move_count + 1,
    ]);
    unseen_moves.push(...next_moves);
  }

  return result;
};

const moveKnight = () => {
  const alphaMap = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const colorMap = [
    "#2E7F18",
    "#2E7F18",
    "#45731E",
    "#675E24",
    "#8D472B",
    "#B13433",
  ];

  const xInput = document.getElementById("input-x");
  const yInput = document.getElementById("input-y");
  const x = alphaMap.indexOf(xInput.value.toUpperCase());
  const y = parseInt(yInput.value) - 1;
  if (!inRange(x) || !inRange(y)) {
    return;
  }

  const moves = generateNumberOfMoves(x, y);

  const checkBoxes = [
    document.getElementById("check-1"),
    document.getElementById("check-2"),
    document.getElementById("check-3"),
    document.getElementById("check-4"),
    document.getElementById("check-5"),
    document.getElementById("check-6"),
  ];

  const checkedValues = checkBoxes
    .map((checkBox, i) => (checkBox.checked ? i + 1 : null))
    .filter((i) => i !== null);
  for (let [moveId, moveCount] of Object.entries(moves)) {
    const el = document.getElementById(moveId);
    if (moveCount === 0 || checkedValues.includes(moveCount)) {
      el.innerHTML = moveCount || "X";
      el.style.color = colorMap[moveCount] || "#FF0000";
    } else {
      el.innerHTML = "";
    }
  }
};

document.addEventListener("DOMContentLoaded", () => {
  // set form submit
  const form = document.getElementById("form");
  form.onsubmit = (event) => {
    event.preventDefault();
    moveKnight();
  };

  // set default values for inputs
  const xInput = document.getElementById("input-x");
  const yInput = document.getElementById("input-y");
  xInput.value = "D";
  yInput.value = "5";

  // set default values and onclick for checkboxes
  const checkBoxes = [
    document.getElementById("check-1"),
    document.getElementById("check-2"),
    document.getElementById("check-3"),
    document.getElementById("check-4"),
    document.getElementById("check-5"),
    document.getElementById("check-6"),
  ];
  checkBoxes.forEach((checkBox) => {
    checkBox.checked = true;
    checkBox.onclick = () => moveKnight();
  });

  // init
  moveKnight();
});
