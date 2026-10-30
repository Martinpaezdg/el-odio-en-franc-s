// Trazos nuevos para la web, inspirados en los contornos y rayones de los afiches.
// No son recortes ni calcos de las imágenes aplanadas de Figma.
(() => {
  const line=(d,color='var(--ink)',width=1.6)=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const svg=(className,viewBox,paths)=>`<svg class="handmark ${className}" viewBox="${viewBox}" aria-hidden="true" focusable="false">${paths}</svg>`;
  document.querySelector('.hero').insertAdjacentHTML('beforeend',svg('hero-handmark','0 0 240 440',
    line('M96 18 L64 67 91 44 55 103 83 76 48 142 72 118 M58 151 C39 176 42 194 33 220 L45 249 29 276 C30 298 43 315 50 328 M178 72 L189 116 180 155 198 180 187 205 C192 230 199 251 211 271 L196 307 215 345 M43 337 C77 366 125 383 174 375 L161 387 185 370 159 365')+
    line('M101 10 L72 57 M88 54 L64 91 M199 277 L208 300','var(--acid)',2.3)));
  document.querySelector('.mouth-art').insertAdjacentHTML('beforeend',svg('mouth-handmark','0 0 640 420',
    line('M62 128 C59 90 104 66 161 61 L145 54 M61 131 L47 115 M56 125 L73 112 M480 337 C535 323 570 284 568 248 L583 262 M566 249 L550 264','var(--ink)',1.5)+
    line('M486 65 L524 42 505 70 544 48 526 79 560 60 M83 340 L110 313 94 345 124 320','var(--acid)',2.2)));
  document.querySelector('.portrait').insertAdjacentHTML('beforeend',svg('portrait-handmark','0 0 260 330',
    line('M196 32 C131 3 50 32 28 109 C7 177 55 251 132 272 C173 283 206 262 228 247 M208 36 L189 20 M207 36 L188 43','var(--ink)',1.4)+
    line('M167 292 L206 266 189 300 229 273 209 308 M43 58 L19 88 38 78 14 111','var(--acid)',2.4)));
  document.querySelector('.scroll-bridge').insertAdjacentHTML('beforeend',svg('bridge-handmark','0 0 190 80',
    line('M12 33 C49 8 79 12 87 34 C97 64 46 68 51 40 C58 7 110 18 139 46 L172 66 M171 65 L166 45 M173 66 L151 66','var(--acid)',2)));
})();
