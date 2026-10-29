import { Course } from '../data/educareData';

/**
 * Generates and triggers the download of a completely self-contained,
 * zero-dependency standalone HTML/CSS/JS application for a specific course.
 * Can be run completely offline in any web browser on any device.
 */
export function downloadCourseStandaloneApp(course: Course): void {
  const levelsJson = JSON.stringify(course.levels || [], null, 2);
  const courseJson = JSON.stringify({
    id: course.id,
    title: course.title,
    tagline: course.tagline,
    category: course.category,
    categoryLabel: course.categoryLabel,
    ageRange: course.ageRange,
    duration: course.duration,
    leadMentor: course.leadMentor,
    toolsProvided: course.toolsProvided,
    featuredProject: course.featuredProject,
  }, null, 2);

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(course.title)} — Standalone Offline Course App</title>
  <style>
    :root {
      --bg: #0c0a09;
      --card-bg: #1c1917;
      --card-border: #292524;
      --text-main: #f5f5f4;
      --text-muted: #a8a29e;
      --accent: #f59e0b;
      --accent-hover: #d97706;
      --accent-light: rgba(245, 158, 11, 0.15);
      --emerald: #10b981;
      --sky: #0284c7;
      --purple: #9333ea;
      --font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background-color: var(--bg);
      color: var(--text-main);
      font-family: var(--font-family);
      line-height: 1.5;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    header {
      background: #171412;
      border-bottom: 1px solid var(--card-border);
      padding: 1rem 1.5rem;
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(12px);
    }
    .header-inner {
      max-width: 1200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .brand-title {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }
    .brand-badge {
      font-size: 0.65rem;
      font-weight: 800;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      background: var(--accent-light);
      color: var(--accent);
      border: 1px solid rgba(245, 158, 11, 0.3);
      padding: 0.2rem 0.5rem;
      border-radius: 4px;
    }
    .offline-tag {
      font-size: 0.7rem;
      font-weight: 600;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 0.2rem 0.6rem;
      border-radius: 9999px;
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
    }
    .offline-tag::before {
      content: '';
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #34d399;
      display: inline-block;
    }
    .progress-bar-wrap {
      flex: 1;
      max-width: 320px;
      min-width: 180px;
    }
    .progress-text {
      font-size: 0.75rem;
      color: var(--text-muted);
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.25rem;
      font-weight: 600;
    }
    .progress-track {
      background: #292524;
      border-radius: 999px;
      height: 8px;
      overflow: hidden;
    }
    .progress-fill {
      background: linear-gradient(90deg, #f59e0b, #10b981);
      height: 100%;
      width: 0%;
      transition: width 0.3s ease;
    }
    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 1.5rem;
      flex: 1;
      width: 100%;
    }
    .hero-banner {
      background: linear-gradient(135deg, #1c1917 0%, #292524 100%);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 2rem;
      position: relative;
      overflow: hidden;
    }
    .hero-banner h1 {
      font-size: 1.75rem;
      font-weight: 800;
      color: #fafaf9;
      margin-bottom: 0.5rem;
      letter-spacing: -0.02em;
    }
    .hero-meta {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 1rem;
    }
    .hero-meta span {
      background: rgba(255, 255, 255, 0.05);
      padding: 0.25rem 0.6rem;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .level-nav {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 0.75rem;
      margin-bottom: 2rem;
    }
    .level-btn {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
      padding: 1rem;
      text-align: left;
      color: var(--text-muted);
      cursor: pointer;
      transition: all 0.2s;
    }
    .level-btn:hover {
      background: #292524;
      color: var(--text-main);
    }
    .level-btn.active {
      background: #2a241c;
      border-color: var(--accent);
      color: #fafaf9;
      box-shadow: 0 0 0 1px var(--accent);
    }
    .level-btn-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.4rem;
    }
    .level-badge {
      font-size: 0.65rem;
      font-weight: 700;
      text-transform: uppercase;
      padding: 0.15rem 0.4rem;
      border-radius: 4px;
      background: rgba(255,255,255,0.1);
    }
    .level-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: #fafaf9;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .lesson-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .lesson-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 1.25rem;
      transition: border-color 0.2s;
    }
    .lesson-card:hover {
      border-color: #44403c;
    }
    .lesson-card.completed {
      border-color: rgba(16, 185, 129, 0.4);
      background: rgba(16, 185, 129, 0.03);
    }
    .lesson-header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      cursor: pointer;
    }
    .lesson-info {
      flex: 1;
    }
    .lesson-top-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.75rem;
      margin-bottom: 0.35rem;
    }
    .lesson-num {
      font-weight: 800;
      color: var(--accent);
      background: var(--accent-light);
      padding: 0.15rem 0.45rem;
      border-radius: 4px;
      font-family: monospace;
    }
    .lesson-dur {
      color: var(--text-muted);
    }
    .lesson-title {
      font-size: 1rem;
      font-weight: 700;
      color: #fafaf9;
    }
    .lesson-checkbox-wrap {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .complete-toggle {
      background: transparent;
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      border-radius: 8px;
      padding: 0.4rem 0.75rem;
      font-size: 0.75rem;
      font-weight: 600;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.35rem;
      transition: all 0.2s;
    }
    .complete-toggle:hover {
      background: #292524;
      color: var(--text-main);
    }
    .complete-toggle.done {
      background: rgba(16, 185, 129, 0.2);
      border-color: var(--emerald);
      color: #34d399;
    }
    .lesson-details {
      margin-top: 1rem;
      padding-top: 1rem;
      border-top: 1px solid var(--card-border);
      display: none;
    }
    .lesson-card.expanded .lesson-details {
      display: block;
    }
    .lab-box {
      background: #141210;
      border: 1px solid #332b20;
      border-radius: 10px;
      padding: 1rem;
      margin: 0.75rem 0;
    }
    .lab-title {
      font-size: 0.8rem;
      font-weight: 800;
      color: var(--accent);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.35rem;
    }
    .notes-box {
      margin-top: 1rem;
    }
    .notes-box textarea {
      width: 100%;
      background: #141210;
      border: 1px solid var(--card-border);
      border-radius: 8px;
      padding: 0.75rem;
      color: var(--text-main);
      font-family: inherit;
      font-size: 0.8rem;
      resize: vertical;
      min-height: 80px;
    }
    .notes-box textarea:focus {
      outline: none;
      border-color: var(--accent);
    }
    .actions-bar {
      margin-top: 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 1rem;
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 12px;
    }
    .btn {
      background: var(--accent);
      color: #0c0a09;
      font-weight: 700;
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      border: none;
      cursor: pointer;
      font-size: 0.85rem;
      transition: background 0.2s;
    }
    .btn:hover {
      background: var(--accent-hover);
    }
    .btn-outline {
      background: transparent;
      color: var(--text-main);
      border: 1px solid var(--card-border);
    }
    .btn-outline:hover {
      background: #292524;
    }
    footer {
      border-top: 1px solid var(--card-border);
      padding: 1.5rem;
      text-align: center;
      font-size: 0.75rem;
      color: var(--text-muted);
      margin-top: auto;
    }
    @media print {
      header, .level-nav, .complete-toggle, .actions-bar, footer { display: none !important; }
      body { background: white; color: black; }
      .lesson-card { border: 1px solid #ccc; page-break-inside: avoid; margin-bottom: 1rem; }
      .lesson-details { display: block !important; }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <div class="brand-title">
        <span class="brand-badge">Standalone Course App</span>
        <span class="offline-tag">100% Offline Ready</span>
      </div>
      <div class="progress-bar-wrap">
        <div class="progress-text">
          <span>Course Completion</span>
          <span id="progress-pct">0%</span>
        </div>
        <div class="progress-track">
          <div class="progress-fill" id="progress-fill"></div>
        </div>
      </div>
      <div>
        <button class="btn btn-outline" onclick="resetProgress()" style="font-size: 0.75rem; padding: 0.35rem 0.75rem;">Reset Progress</button>
      </div>
    </div>
  </header>

  <main>
    <div class="hero-banner">
      <div style="font-size: 0.75rem; font-weight: 700; color: var(--accent); text-transform: uppercase; margin-bottom: 0.25rem;">
        Educare Standalone Learning Track
      </div>
      <h1>${escapeHtml(course.title)}</h1>
      <p style="color: var(--text-muted); font-size: 0.95rem; max-width: 800px;">
        ${escapeHtml(course.tagline)}
      </p>
      <div class="hero-meta">
        <span>Curriculum: 5 Levels · 50 Lessons</span>
        <span>Ages: ${escapeHtml(course.ageRange)}</span>
        <span>Schedule: ${escapeHtml(course.duration)}</span>
        <span>Mentor: ${escapeHtml(course.leadMentor.name)}</span>
        <span style="color: #34d399; font-weight: bold;">Tuition: 100% Free ($0)</span>
      </div>
    </div>

    <!-- 5 Levels Navigation -->
    <div class="level-nav" id="level-nav"></div>

    <!-- Active Level Header -->
    <div style="margin-bottom: 1.25rem; display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 0.5rem;">
      <div>
        <div id="active-level-tier" style="font-size: 0.75rem; font-weight: 700; text-transform: uppercase; color: var(--accent);">Level 1: Beginner</div>
        <h2 id="active-level-title" style="font-size: 1.35rem; font-weight: 800; color: #fafaf9;">Level Overview</h2>
      </div>
      <div id="active-level-stat" style="font-size: 0.8rem; color: var(--text-muted); font-family: monospace;">10 Lessons</div>
    </div>

    <!-- Lesson List -->
    <div class="lesson-grid" id="lesson-grid"></div>

    <!-- Action Bar -->
    <div class="actions-bar">
      <div>
        <div style="font-weight: 700; font-size: 0.85rem;">Offline Study Guarantee</div>
        <div style="font-size: 0.75rem; color: var(--text-muted);">
          All notes and progress are stored safely in your device's browser localStorage.
        </div>
      </div>
      <div style="display: flex; gap: 0.5rem;">
        <button class="btn btn-outline" onclick="window.print()">Print / Export PDF</button>
        <button class="btn" onclick="checkAllInLevel()">Complete Level</button>
      </div>
    </div>
  </main>

  <footer>
    Educare Standalone Course Platform · Free Education for Youth · Operates 100% offline with zero network connectivity required.
  </footer>

  <script>
    const COURSE = ${courseJson};
    const LEVELS = ${levelsJson};
    const STORAGE_KEY = 'educare_standalone_progress_' + COURSE.id;
    const NOTES_KEY = 'educare_standalone_notes_' + COURSE.id;

    let activeLevelIndex = 0;
    let completedLessons = loadCompleted();
    let userNotes = loadNotes();

    function loadCompleted() {
      try {
        const val = localStorage.getItem(STORAGE_KEY);
        return val ? JSON.parse(val) : {};
      } catch(e) { return {}; }
    }
    function saveCompleted() {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(completedLessons)); } catch(e) {}
    }
    function loadNotes() {
      try {
        const val = localStorage.getItem(NOTES_KEY);
        return val ? JSON.parse(val) : {};
      } catch(e) { return {}; }
    }
    function saveNotes(lessonKey, text) {
      userNotes[lessonKey] = text;
      try { localStorage.setItem(NOTES_KEY, JSON.stringify(userNotes)); } catch(e) {}
    }

    function updateProgress() {
      const totalLessons = 50;
      const count = Object.values(completedLessons).filter(Boolean).length;
      const pct = Math.round((count / totalLessons) * 100);
      document.getElementById('progress-pct').innerText = count + ' / ' + totalLessons + ' (' + pct + '%)';
      document.getElementById('progress-fill').style.width = pct + '%';
    }

    function toggleLesson(levelNum, lessonNum, e) {
      if (e) e.stopPropagation();
      const key = 'L' + levelNum + '_#' + lessonNum;
      completedLessons[key] = !completedLessons[key];
      saveCompleted();
      updateProgress();
      renderLessons();
    }

    function checkAllInLevel() {
      const currentLevel = LEVELS[activeLevelIndex];
      if (!currentLevel) return;
      currentLevel.lessons.forEach(l => {
        const key = 'L' + currentLevel.levelNumber + '_#' + l.lessonNumber;
        completedLessons[key] = true;
      });
      saveCompleted();
      updateProgress();
      renderLessons();
    }

    function resetProgress() {
      if (confirm('Reset your progress on this course?')) {
        completedLessons = {};
        saveCompleted();
        updateProgress();
        renderLessons();
      }
    }

    function toggleExpand(cardId) {
      const card = document.getElementById(cardId);
      if (card) {
        card.classList.toggle('expanded');
      }
    }

    function renderLevelNav() {
      const nav = document.getElementById('level-nav');
      nav.innerHTML = '';
      LEVELS.forEach((lvl, idx) => {
        const btn = document.createElement('button');
        btn.className = 'level-btn ' + (idx === activeLevelIndex ? 'active' : '');
        btn.onclick = () => {
          activeLevelIndex = idx;
          renderLevelNav();
          renderLessons();
        };

        const tierBg = lvl.tier === 'Beginner' ? '#065f46' : (lvl.tier === 'Intermediate' ? '#075985' : '#581c87');

        btn.innerHTML = \`
          <div class="level-btn-top">
            <span style="font-size:0.7rem; font-weight:800; font-family:monospace;">LEVEL \${lvl.levelNumber}</span>
            <span class="level-badge" style="background:\${tierBg}; color:#fff;">\${lvl.tier}</span>
          </div>
          <div class="level-title">\${escapeHtml(lvl.title.replace(/^Level \\d+:\\s*/, ''))}</div>
          <div style="font-size:0.7rem; color:var(--text-muted); margin-top:0.4rem;">10 Lessons · ~\${lvl.estimatedHours} hrs</div>
        \`;
        nav.appendChild(btn);
      });
    }

    function renderLessons() {
      const currentLevel = LEVELS[activeLevelIndex];
      if (!currentLevel) return;

      document.getElementById('active-level-tier').innerText = 'Level ' + currentLevel.levelNumber + ' · ' + currentLevel.tier + ' Tier';
      document.getElementById('active-level-title').innerText = currentLevel.title;
      document.getElementById('active-level-stat').innerText = '10 Lessons · Hands-on Labs Included';

      const grid = document.getElementById('lesson-grid');
      grid.innerHTML = '';

      currentLevel.lessons.forEach((l) => {
        const key = 'L' + currentLevel.levelNumber + '_#' + l.lessonNumber;
        const isDone = !!completedLessons[key];
        const cardId = 'lesson-card-' + currentLevel.levelNumber + '-' + l.lessonNumber;
        const noteVal = userNotes[key] || '';

        const card = document.createElement('div');
        card.id = cardId;
        card.className = 'lesson-card ' + (isDone ? 'completed' : '');

        card.innerHTML = \`
          <div class="lesson-header" onclick="toggleExpand('\${cardId}')">
            <div class="lesson-info">
              <div class="lesson-top-meta">
                <span class="lesson-num">Lesson \${l.lessonNumber}</span>
                <span class="lesson-dur">⏱ \${escapeHtml(l.durationMinutes)} min</span>
              </div>
              <div class="lesson-title">\${escapeHtml(l.title)}</div>
              <div style="font-size:0.8rem; color:var(--text-muted); margin-top:0.25rem;">\${escapeHtml(l.description)}</div>
            </div>
            <div class="lesson-checkbox-wrap">
              <button class="complete-toggle \${isDone ? 'done' : ''}" onclick="toggleLesson(\${currentLevel.levelNumber}, \${l.lessonNumber}, event)">
                \${isDone ? '✓ Completed' : 'Mark Done'}
              </button>
            </div>
          </div>

          <div class="lesson-details">
            <div class="lab-box">
              <div class="lab-title">🔬 Hands-on Practical Lab</div>
              <div style="font-size:0.85rem; color:#fafaf9; font-weight:600;">\${escapeHtml(l.practicalLab)}</div>
            </div>

            <div style="margin-top:0.75rem;">
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); text-transform:uppercase;">Skills Learned:</div>
              <ul style="list-style:disc; margin-left:1.25rem; font-size:0.8rem; color:#d6d3d1; margin-top:0.25rem;">
                \${(l.skillsLearned || []).map(c => '<li>' + escapeHtml(c) + '</li>').join('')}
              </ul>
            </div>

            <div class="notes-box">
              <div style="font-size:0.75rem; font-weight:700; color:var(--text-muted); margin-bottom:0.35rem;">
                📝 Personal Offline Notes (Saved automatically)
              </div>
              <textarea placeholder="Write down observations, code snippets, or notes..." oninput="saveNotes('\${key}', this.value)">\${escapeHtml(noteVal)}</textarea>
            </div>
          </div>
        \`;
        grid.appendChild(card);
      });
    }

    function escapeHtml(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    // Initialize
    renderLevelNav();
    renderLessons();
    updateProgress();
  </script>
</body>
</html>`;

  // Trigger browser download of the standalone HTML file
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  const safeTitle = course.title
    .replace(/[^a-zA-Z0-9_-]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
  anchor.href = url;
  anchor.download = `Educare-${safeTitle}-standalone-app.html`;
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
