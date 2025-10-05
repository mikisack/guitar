// ギターコードデータ
const chordData = {
    // 基本コード
    'C': {
        name: 'C Major',
        fingers: ['X', '3', '2', '0', '1', '0'],
        description: 'Cメジャーコード',
        difficulty: '初級'
    },
    'G': {
        name: 'G Major',
        fingers: ['3', '2', '0', '0', '3', '3'],
        description: 'Gメジャーコード',
        difficulty: '初級'
    },
    'Am': {
        name: 'A minor',
        fingers: ['X', '0', '2', '2', '1', '0'],
        description: 'Aマイナーコード',
        difficulty: '初級'
    },
    'F': {
        name: 'F Major',
        fingers: ['1', '3', '3', '2', '1', '1'],
        description: 'Fメジャーコード（バレーコード）',
        difficulty: '中級'
    },
    'Dm': {
        name: 'D minor',
        fingers: ['X', 'X', '0', '2', '3', '1'],
        description: 'Dマイナーコード',
        difficulty: '初級'
    },
    'Em': {
        name: 'E minor',
        fingers: ['0', '2', '2', '0', '0', '0'],
        description: 'Eマイナーコード',
        difficulty: '初級'
    },
    'D': {
        name: 'D Major',
        fingers: ['X', 'X', '0', '2', '3', '2'],
        description: 'Dメジャーコード',
        difficulty: '初級'
    },
    'A': {
        name: 'A Major',
        fingers: ['X', '0', '2', '2', '2', '0'],
        description: 'Aメジャーコード',
        difficulty: '初級'
    },
    'E': {
        name: 'E Major',
        fingers: ['0', '2', '2', '1', '0', '0'],
        description: 'Eメジャーコード',
        difficulty: '初級'
    },
    'Bm': {
        name: 'B minor',
        fingers: ['X', '2', '4', '4', '3', '2'],
        description: 'Bマイナーコード（バレーコード）',
        difficulty: '中級'
    },
    'B': {
        name: 'B Major',
        fingers: ['X', '2', '4', '4', '4', '2'],
        description: 'Bメジャーコード（バレーコード）',
        difficulty: '中級'
    },
    'C#': {
        name: 'C# Major',
        fingers: ['X', '4', '6', '6', '6', '4'],
        description: 'C#メジャーコード（バレーコード）',
        difficulty: '中級'
    },
    
    // 分数コード
    'AonC#': {
        name: 'A on C#',
        fingers: ['X', '4', '2', '2', '2', '0'],
        description: 'A/C# - AメジャーのベースがC#',
        difficulty: '中級'
    },
    'Bm7onA': {
        name: 'Bm7 on A',
        fingers: ['X', '0', '4', '4', '3', '2'],
        description: 'Bm7/A - Bm7のベースがA',
        difficulty: '中級'
    },
    
    // セブンスコード
    'F#7': {
        name: 'F# 7',
        fingers: ['2', '4', '2', '3', '2', '2'],
        description: 'F#セブンスコード（バレーコード）',
        difficulty: '上級'
    },
    'Bm7': {
        name: 'B minor 7',
        fingers: ['X', '2', '4', '2', '3', '2'],
        description: 'Bマイナーセブンスコード',
        difficulty: '中級'
    },
    
    // サスペンデッドコード
    'F#7sus4': {
        name: 'F# 7sus4',
        fingers: ['2', '4', '2', '4', '2', '2'],
        description: 'F#セブンスサスフォーコード（バレーコード）',
        difficulty: '上級'
    },
    
    // その他のコード
    'Gm': {
        name: 'G minor',
        fingers: ['3', '5', '5', '3', '3', '3'],
        description: 'Gマイナーコード（バレーコード）',
        difficulty: '中級'
    }
};

// 弦の名前
const stringNames = ['6弦(E)', '5弦(A)', '4弦(D)', '3弦(G)', '2弦(B)', '1弦(E)'];

// DOM要素
const chordInput = document.getElementById('chordInput');
const searchBtn = document.getElementById('searchBtn');
const chordResult = document.getElementById('chordResult');
const chordButtons = document.querySelectorAll('.chord-btn');

// 練習モード用のDOM要素
const searchModeBtn = document.getElementById('searchModeBtn');
const practiceModeBtn = document.getElementById('practiceModeBtn');
const searchMode = document.getElementById('searchMode');
const practiceMode = document.getElementById('practiceMode');
const songNameInput = document.getElementById('songNameInput');
const songSelect = document.getElementById('songSelect');
const saveSongBtn = document.getElementById('saveSongBtn');
const deleteSongBtn = document.getElementById('deleteSongBtn');
const chordProgressionInput = document.getElementById('chordProgressionInput');
const setProgressionBtn = document.getElementById('setProgressionBtn');
const prevChordBtn = document.getElementById('prevChordBtn');
const nextChordBtn = document.getElementById('nextChordBtn');
const chordProgress = document.getElementById('chordProgress');
const currentChordDisplay = document.getElementById('currentChordDisplay');
const chordSequence = document.getElementById('chordSequence');

// 練習モード用の変数
let currentSongChords = [];
let currentChordIndex = 0;
let savedSongs = JSON.parse(localStorage.getItem('guitarSongs')) || {};

// コード表示関数
function displayChord(chordName) {
    const chord = chordData[chordName];
    
    if (!chord) {
        chordResult.innerHTML = `
            <div class="error">
                <p>「${chordName}」のコードが見つかりませんでした</p>
                <p>対応コード: ${Object.keys(chordData).join(', ')}</p>
            </div>
        `;
        return;
    }

    let chordHTML = `
        <div class="chord-info">
            <h2>${chord.name} (${chordName})</h2>
            <p class="description">${chord.description}</p>
            <p class="difficulty">難易度: ${chord.difficulty}</p>
        </div>
        
        <div class="chord-diagram">
            <div class="fretboard">
                <div class="strings">
    `;

    // 各弦の表示
    for (let i = 0; i < 6; i++) {
        const finger = chord.fingers[i];
        const stringName = stringNames[i];
        
        chordHTML += `
            <div class="string-line">
                <span class="string-name">${stringName}</span>
                <div class="frets">
        `;

        // フレット表示（0-7フレット、高フレット対応）
        const maxFret = Math.max(7, parseInt(finger) || 0);
        for (let fret = 0; fret <= maxFret; fret++) {
            let fretClass = 'fret';
            let content = '';

            if (finger === 'X') {
                if (fret === 0) {
                    fretClass += ' muted';
                    content = '×';
                }
            } else if (finger === '0') {
                if (fret === 0) {
                    fretClass += ' open';
                    content = '○';
                }
            } else if (parseInt(finger) === fret) {
                fretClass += ' pressed';
                content = finger;
            }

            chordHTML += `<div class="${fretClass}">${content}</div>`;
        }

        chordHTML += `
                </div>
            </div>
        `;
    }

    chordHTML += `
                </div>
            </div>
        </div>
        
        <div class="chord-tips">
            <h3>押さえ方のコツ</h3>
            <ul>
                <li>○ = 開放弦（何も押さえない）</li>
                <li>× = その弦は弾かない</li>
                <li>数字 = そのフレットを押さえる</li>
                <li>指の腹でしっかりと弦を押さえましょう</li>
                <li>他の弦に触れないよう注意しましょう</li>
            </ul>
        </div>
    `;

    chordResult.innerHTML = chordHTML;
}

// 検索機能
function searchChord() {
    const chordName = chordInput.value.trim();
    if (chordName) {
        displayChord(chordName);
    }
}

// イベントリスナー
searchBtn.addEventListener('click', searchChord);

chordInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchChord();
    }
});

// 人気コードボタンのイベントリスナー
chordButtons.forEach(button => {
    button.addEventListener('click', function() {
        const chordName = this.dataset.chord;
        chordInput.value = chordName;
        displayChord(chordName);
    });
});

// 練習モード用コード表示関数
function displayPracticeChord(chordName, targetElement = currentChordDisplay) {
    const chord = chordData[chordName];
    
    if (!chord) {
        targetElement.innerHTML = `
            <div class="error">
                <p>「${chordName}」のコードが見つかりませんでした</p>
            </div>
        `;
        return;
    }

    let chordHTML = `
        <div class="chord-info">
            <h2>${chord.name} (${chordName})</h2>
            <p class="description">${chord.description}</p>
            <p class="difficulty">難易度: ${chord.difficulty}</p>
        </div>
        
        <div class="chord-diagram">
            <div class="fretboard">
                <div class="strings">
    `;

    // 各弦の表示
    for (let i = 0; i < 6; i++) {
        const finger = chord.fingers[i];
        const stringName = stringNames[i];
        
        chordHTML += `
            <div class="string-line">
                <span class="string-name">${stringName}</span>
                <div class="frets">
        `;

        // フレット表示（0-7フレット、高フレット対応）
        const maxFret = Math.max(7, parseInt(finger) || 0);
        for (let fret = 0; fret <= maxFret; fret++) {
            let fretClass = 'fret';
            let content = '';

            if (finger === 'X') {
                if (fret === 0) {
                    fretClass += ' muted';
                    content = '×';
                }
            } else if (finger === '0') {
                if (fret === 0) {
                    fretClass += ' open';
                    content = '○';
                }
            } else if (parseInt(finger) === fret) {
                fretClass += ' pressed';
                content = finger;
            }

            chordHTML += `<div class="${fretClass}">${content}</div>`;
        }

        chordHTML += `
                </div>
            </div>
        `;
    }

    chordHTML += `
                </div>
            </div>
        </div>
    `;

    targetElement.innerHTML = chordHTML;
}

// モード切替機能
function switchToSearchMode() {
    searchModeBtn.classList.add('active');
    practiceModeBtn.classList.remove('active');
    searchMode.classList.remove('hidden');
    practiceMode.classList.add('hidden');
}

function switchToPracticeMode() {
    practiceModeBtn.classList.add('active');
    searchModeBtn.classList.remove('active');
    practiceMode.classList.remove('hidden');
    searchMode.classList.add('hidden');
    loadSavedSongs();
}

// 曲の管理機能
function loadSavedSongs() {
    songSelect.innerHTML = '<option value="">曲を選択</option>';
    Object.keys(savedSongs).forEach(songName => {
        const option = document.createElement('option');
        option.value = songName;
        option.textContent = songName;
        songSelect.appendChild(option);
    });
}

function saveSong() {
    const songName = songNameInput.value.trim();
    const progression = chordProgressionInput.value.trim();
    
    if (!songName || !progression) {
        alert('曲名とコード進行を入力してください');
        return;
    }
    
    savedSongs[songName] = progression;
    localStorage.setItem('guitarSongs', JSON.stringify(savedSongs));
    loadSavedSongs();
    alert(`「${songName}」を保存しました`);
}

function loadSong() {
    const songName = songSelect.value;
    if (songName && savedSongs[songName]) {
        songNameInput.value = songName;
        chordProgressionInput.value = savedSongs[songName];
    }
}

function deleteSong() {
    const songName = songSelect.value;
    if (songName && savedSongs[songName]) {
        if (confirm(`「${songName}」を削除しますか？`)) {
            delete savedSongs[songName];
            localStorage.setItem('guitarSongs', JSON.stringify(savedSongs));
            loadSavedSongs();
            songNameInput.value = '';
            chordProgressionInput.value = '';
            alert(`「${songName}」を削除しました`);
        }
    } else {
        alert('削除する曲を選択してください');
    }
}

// コード進行設定機能
function setChordProgression() {
    const progression = chordProgressionInput.value.trim();
    if (!progression) {
        alert('コード進行を入力してください');
        return;
    }
    
    // コード進行をパース（改行とスペースで分割）
    currentSongChords = progression
        .split(/[\n\s]+/)
        .filter(chord => chord.trim() !== '');
    
    if (currentSongChords.length === 0) {
        alert('有効なコード進行を入力してください');
        return;
    }
    
    currentChordIndex = 0;
    updatePracticeDisplay();
    updateChordSequenceDisplay();
}

// 練習表示更新
function updatePracticeDisplay() {
    if (currentSongChords.length === 0) {
        currentChordDisplay.innerHTML = '<p class="instruction">コード進行を設定してください</p>';
        chordProgress.textContent = '-/-';
        prevChordBtn.disabled = true;
        nextChordBtn.disabled = true;
        return;
    }
    
    const currentChord = currentSongChords[currentChordIndex];
    displayPracticeChord(currentChord);
    
    chordProgress.textContent = `${currentChordIndex + 1}/${currentSongChords.length}`;
    prevChordBtn.disabled = currentChordIndex === 0;
    nextChordBtn.disabled = currentChordIndex === currentSongChords.length - 1;
}

// コード進行表示更新
function updateChordSequenceDisplay() {
    if (currentSongChords.length === 0) {
        chordSequence.innerHTML = 'コード進行が設定されていません';
        return;
    }
    
    let sequenceHTML = '';
    currentSongChords.forEach((chord, index) => {
        const className = index === currentChordIndex ? 'current-chord' : '';
        sequenceHTML += `<span class="chord-item ${className}">${chord}</span>`;
    });
    
    chordSequence.innerHTML = sequenceHTML;
}

// ナビゲーション機能
function goToPrevChord() {
    if (currentChordIndex > 0) {
        currentChordIndex--;
        updatePracticeDisplay();
        updateChordSequenceDisplay();
    }
}

function goToNextChord() {
    if (currentChordIndex < currentSongChords.length - 1) {
        currentChordIndex++;
        updatePracticeDisplay();
        updateChordSequenceDisplay();
    }
}

// イベントリスナー設定
searchModeBtn.addEventListener('click', switchToSearchMode);
practiceModeBtn.addEventListener('click', switchToPracticeMode);
songSelect.addEventListener('change', loadSong);
saveSongBtn.addEventListener('click', saveSong);
deleteSongBtn.addEventListener('click', deleteSong);
setProgressionBtn.addEventListener('click', setChordProgression);
prevChordBtn.addEventListener('click', goToPrevChord);
nextChordBtn.addEventListener('click', goToNextChord);

// キーボードショートカット
document.addEventListener('keydown', function(e) {
    if (practiceMode.classList.contains('hidden')) return;
    
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goToPrevChord();
    } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goToNextChord();
    }
});

// 初期表示
displayChord('C');