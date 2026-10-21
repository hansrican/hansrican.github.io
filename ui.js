/* 页面级 UI：回到顶部 + 版本开关。
   独立文件，不依赖 site.js —— site.js 里若有语句抛错，不影响这两个控件。 */
(() => {
  const $ = (sel) => document.querySelector(sel)

  /* ── 回到顶部 ── */
  try {
    if (!$('.to-top')) {
      if (!document.body.id) document.body.id = 'top'
      const sentinel = document.createElement('div')
      sentinel.setAttribute('aria-hidden', 'true')
      sentinel.style.cssText =
        'position:absolute;top:0;left:0;width:1px;height:420px;pointer-events:none;visibility:hidden'
      document.body.prepend(sentinel)

      const btn = document.createElement('a')
      btn.className = 'to-top'
      btn.href = '#top'
      btn.setAttribute('aria-label', '回到顶部')
      btn.innerHTML = '<span aria-hidden="true">↑</span><em>回到顶部</em>'
      document.body.appendChild(btn)

      const setVisible = (on) => btn.classList.toggle('is-visible', on)
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), { threshold: 0 }).observe(sentinel)
      }
      window.addEventListener(
        'scroll',
        () => setVisible((window.scrollY || document.documentElement.scrollTop || 0) > 420),
        { passive: true }
      )

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      btn.addEventListener('click', (e) => {
        if (reduce) return
        e.preventDefault()
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  } catch (err) {
    /* 控件失败不应阻断页面 */
  }

  /* ── 版本开关：原版 ⇄ 护眼（标题页不显示）── */
  try {
    if (!$('.theme-toggle') && !document.body.classList.contains('modern-home')) {
      const KEY = 'dsh-theme'
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'theme-toggle'

      const paint = () => {
        const alt = document.documentElement.dataset.theme === 'alt'
        btn.textContent = alt ? '浅色大字' : '深色'
        btn.setAttribute('aria-pressed', String(alt))
        btn.title = alt ? '当前：浅色大字。点击切换为深色' : '当前：深色。点击切换为浅色大字'
      }

      btn.addEventListener('click', () => {
        const alt = document.documentElement.dataset.theme === 'alt'
        if (alt) delete document.documentElement.dataset.theme
        else document.documentElement.dataset.theme = 'alt'
        try { localStorage.setItem(KEY, alt ? 'dark' : 'alt') } catch (e) {}
        paint()
      })

      document.body.appendChild(btn)
      paint()
    }
  } catch (err) {
    /* 同上 */
  }
})()
