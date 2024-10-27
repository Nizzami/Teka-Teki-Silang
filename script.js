const crossword = document.getElementById("crossword");

// Matriks jawaban untuk mendatar dan menurun (sisipkan dalam layout grid 12x13)
const puzzleGrid = [
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, "C", null, null, null, null, null, null, null, null, null, null, null],
  [null, null, null, "O", null, null, null, null, null, "J", null, null, null, null, null],
  [null, "R", "A", "M", null, null, "C", null, "M", "A", "C", "O", "S", null, null],
  [null, "O", null, "P", null, null, "P", null, null, "V", null, null, null, null, null],
  [null, "M", null, "I", "N", "P", "U", "T", null, "A", null, null, null, null, null],
  [null, null, null, "L", null, null, null, null, null, "S", null, null, null, null, null],
  [null, null, null, "E", null, null, null, null, null, "C", null, null, null, null, null],
  [null, null, "P", "R", "O", "S", "E", "S", "O", "R", null, null, null, null, null],
  [null, null, null, null, null, null, null, null, null, "I", null, null, "L", null, null],
  [null, null, null, null, null, null, null, null, null, "P", null, null, "I", null, null],
  [null, null, null, null, null, null, null, "K", "O", "T", "L", "I", "N", null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, "U", null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, "X", null, null],
  [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
];

// Jawaban yang benar berdasarkan posisi baris dan kolom
const answers = {
  // mendatar
  "3,1": "R",
  "3,2": "A",
  "3,3": "M", // RAM
  "5,3": "I",
  "5,4": "N",
  "5,5": "P",
  "5,6": "U",
  "5,7": "T", // INPUT
  "8,2": "P",
  "8,3": "R",
  "8,4": "O",
  "8,5": "S",
  "8,6": "E",
  "8,7": "S",
  "8,8": "O",
  "8,9": "R", // PROSESOR
  "3,8": "M",
  "3,9": "A",
  "3,10": "C",
  "3,11": "O",
  "3,12": "S", // MACOS
  "11,7": "K",
  "11,8": "O",
  "11,9": "T",
  "11,10": "L",
  "11,11": "I",
  "11,12": "N", // KOTLIN

  // menurun
  "1,3": "C",
  "2,3": "O",
  "3,3": "M",
  "4,3": "P",
  "5,3": "I",
  "6,3": "L",
  "7,3": "E", // KOMPILER
  "3,1": "R",
  "4,1": "O",
  "5,1": "M", // ROM
  "3,6": "C",
  "4,6": "P",
  "5,6": "U", // CPU
  "2,9": "J",
  "3,9": "A",
  "4,9": "V",
  "5,9": "A",
  "6,9": "S",
  "7,9": "C",
  "8,9": "R",
  "9,9": "I",
  "10,9": "P",
  "11,9": "T", // JAVASCRIPT
  "9,12": "L",
  "10,12": "I",
  "11,12": "N",
  "12,12": "U",
  "13,12": "X", // LINUX
};

const numberPositions = {
  "3,1": 1,
  "5,3": 2,
  "8,2": 3,
  "3,8": 4,
  "11,7": 5,
  "1,3": 6,
  //"3,1": 7,
  "3,6": 8,
  "2,9": 9,
  "9,12": 10,
};

// Fungsi untuk membuat teka-teki silang
function generateCrossword() {
  for (let i = 0; i < 15; i++) {
    for (let j = 0; j < 15; j++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if (puzzleGrid[i][j] !== null) {
        cell.classList.add("answer-cell");

        // Tambahkan nomor ke kotak berdasarkan posisi
        if (numberPositions[`${i},${j}`] !== undefined) {
          const numberSpan = document.createElement("span");
          numberSpan.classList.add("number");
          numberSpan.textContent = numberPositions[`${i},${j}`];
          cell.appendChild(numberSpan);
        }

        // Tambahkan input untuk jawaban
        const input = document.createElement("input");
        input.classList.add("answer-input");
        input.setAttribute("maxlength", "1"); // Batasi input hanya satu huruf
        input.setAttribute("data-position", `${i},${j}`); // Simpan posisi untuk referensi
        input.setAttribute("type", "text"); // Tambahkan atribut type
        cell.appendChild(input);
      }

      crossword.appendChild(cell);
    }
  }
}

// Menjalankan fungsi untuk membuat teka-teki silang
generateCrossword();

// Fungsi untuk memeriksa jawaban dan menghitung skor
function checkAnswers() {
  let score = 0;
  let correctCount = 0;

  for (let key in answers) {
    const [row, col] = key.split(",").map(Number);
    const cellIndex = row * 15 + col;
    const cell = crossword.children[cellIndex];

    // Ambil jawaban pengguna dari input
    const userInput = cell.querySelector(".answer-input");
    const userAnswer = userInput ? userInput.value.trim().toUpperCase() : "";

    console.log(`Posisi: ${key}, Jawaban Pengguna: "${userAnswer}", Jawaban Benar: "${answers[key]}"`);

    // Jika jawaban pengguna sesuai dengan jawaban yang benar, tambahkan skor
    if (userAnswer === answers[key]) {
      score += 2;
      cell.style.backgroundColor = "blue"; // Biru untuk jawaban benar
      correctCount++;
    } else if (userAnswer === "") {
      console.log(`Kotak kosong di posisi ${key} diubah menjadi lightyellow`);
      cell.style.backgroundColor = "lightyellow"; // Kuning jika kosong
    } else {
      score -= 1;
      cell.style.backgroundColor = "red"; // Merah untuk jawaban salah
    }
  }

  // Bonus 4 poin jika semua jawaban benar
  if (correctCount === Object.keys(answers).length) {
    score += 4;
  }

  // Tampilkan skor
  document.getElementById("score-display").textContent = `Skor: ${score}`;
}
