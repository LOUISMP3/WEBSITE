import os

files = [
    '/Users/louislemahec/Desktop/S2I/WEBSITE/nike.html',
    '/Users/louislemahec/Desktop/S2I/WEBSITE/lacoste.html',
    '/Users/louislemahec/Desktop/S2I/WEBSITE/NFPM.html',
    '/Users/louislemahec/Desktop/S2I/WEBSITE/sergio.html'
]

btn_html = """      <div id="videoOverlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 8; cursor: pointer;"></div>
      <button id="fsButton" style="position: absolute; bottom: 15px; right: 15px; width: 36px; height: 36px; background: rgba(0,0,0,0.4); border: none; cursor: pointer; z-index: 10; border-radius: 4px; display: flex; align-items: center; justify-content: center; transition: background 0.2s;" onmouseover="this.style.background='rgba(0,0,0,0.8)'" onmouseout="this.style.background='rgba(0,0,0,0.4)'" aria-label="Plein écran">
        <svg viewBox="0 0 24 24" width="20" height="20" stroke="white" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
      </button>"""

script_addition = """  const fsBtn = document.getElementById('fsButton');
  if (fsBtn) {
    fsBtn.onclick = (e) => {
      e.stopPropagation();
      if (v.requestFullscreen) {
        v.requestFullscreen();
      } else if (v.webkitRequestFullscreen) {
        v.webkitRequestFullscreen();
      } else if (v.webkitEnterFullscreen) {
        v.webkitEnterFullscreen();
      }
    };
  }"""

for path in files:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    if 'id="fsButton"' not in content:
        content = content.replace('<div id="videoOverlay" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 8; cursor: pointer;"></div>', btn_html)
    
    if 'const fsBtn' not in content:
        content = content.replace('if (overlay) overlay.onclick = togglePlay;', script_addition + '\n\n  if (overlay) overlay.onclick = togglePlay;')
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

print("Updated 4 files with fullscreen button.")
