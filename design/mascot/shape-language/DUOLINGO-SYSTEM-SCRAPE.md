# Duolingo Design System — Scraped notes (full pass)

**Primary site:** [design.duolingo.com](https://design.duolingo.com/)  
**Key pages:** Shape language · Characters · Duo · Identity (color/logos) · Marketing  
**Also:** [Blog — Shape language](https://blog.duolingo.com/shape-language-duolingos-art-style/), community UX reference synthesis  

**Use:** Method only. **Never** ship Duo the owl, feather green brand, or copy their IP. ACADEMe applies the *rules* with our palette and product personality.

---

## Site map (what “all of them” covers)

| Area | Topics relevant to mascots |
|------|----------------------------|
| **Illustration / Shape language** | Construction, rhythm, simplicity, objects in space, shadows, color |
| **Illustration / Characters** | Body types, eyes, noses, mouths, hair, arms/hands, posing |
| **Illustration / Duo** | Mascot-specific construction & don’ts |
| **Identity** | Brand colors, logos (mark rules) |
| **Writing** | Brand narrative / voice (personality) |
| **Marketing** | Assets, consistency across mediums |

---

## 1. Shape language

### Construction
- **3 primitives only:** rounded rectangle (most used), circle, rounded triangle  
- Pathfinder/boolean OK; **every edge stays rounded**  
- **Pointy shapes = off-brand**

### Rhythm
- Vary shape **sizes and placement** (like notes in a melody)  
- Same-weight shapes = boring  

### Simplicity
| Count | Verdict |
|-------|---------|
| ~6 | Too abstract |
| **~15** | **Good** |
| ~30 | Too many |

### Objects in space
- **Flat perspective** (no true 3D vanishing)  
- Depth only along the **same line of sight**

### Shadows & shading
- Shadow under character = **pill shape** (rounded rect), **never oval** (ovals read as perspective)  
- Shadow **darker** than the ground it sits on  
- Don’t put a shadow that isn’t darker than its base  

### Color (illustration)
- App white bg → prefer **light pastels** as bases; gray feels lifeless  
- Few colors per illustration (small-size legibility)  
- Full palette lives in their illustration color section  

### Production goals (blog)
- Quick to produce (vector)  
- Clear to understand (education)  
- Fun to learn with (exaggeration, humor, storytelling)  
- Silhouette first; negative space; small screens  

---

## 2. Characters

### Overall
- Diverse, quirky, lovable  
- Head + body usually **1–2 basic shapes each**  
- **Shape repetition** across the design for cohesion  
- Avoid too many shapes → muddies silhouette  

### Eyes (5 main geometric styles)
- Round · glasses · almond · linear · dots  
- Geometric only; explore variants if still geometric  
- **Dots** only if character is always tiny  
- Emotion via pupil size, lids, shiny-eye  
- Note from UX ref: avoid creepy “dead center” pupils on Duo; offset for life  

### Noses
- **1–2 rounded rectangles**  
- Size flexible per character  

### Mouths
- **Least geometric** part of the face  
- Prefer **asymmetry** (favor one side) = more alive  
- Can break face frame for extreme emotion  
- Teeth/tongue centered when used  

### Hair
- **1–2 large shapes** (not dozens of strands)  
- Some hair above ear/sideburn when human  

### Arms & hands
- Abstract  
- Hands often **circles**  
- Minimum fingers; **never more than 4**  
- Don’t detach hand from arm or shorten forearm badly  

### Posing
- Pose for **personality**  
- Static, expressionless = lifeless  
- Not every pose fits every character  

---

## 3. Duo (mascot lessons — transfer, don’t copy)

| Trait | Lesson for any mascot |
|-------|------------------------|
| Simple: body + wings | Few big pieces |
| Big endearing eyes | Eyes carry emotion |
| Unique body shape | Silhouette = brand |
| Detached feet / float accents | Optional signature motion language |
| Bend waist/elbow/wrist | Limited joints only |
| Quirky, supportive, slightly awkward | Personality sentence first |
| **Don’ts** | Creepy centered pupils; extra fingers; weapons; random violence; style drift |

---

## 4. Brand / marketing (relevant bits)

- Consistency across product + marketing  
- Logo: clear space, no skew/recolor abuse  
- Icon: works tiny (favicon scale)  

---

## 5. What we got wrong before (why you disliked rounds)

| Problem | Duo rule we underused |
|---------|------------------------|
| Flat front “sticker heads” only | Posing + personality |
| Eyes too dead/centered | Offset pupils, bigger eyes |
| No ground/shadow system | Pill shadow |
| Too many similar blobs | Unique silhouette each |
| Animals as generic icons | Head/body 1–2 shapes + quirky pose |
| No floating accent | Signature detachable prop |

---

## 6. ACADEMe translation

| Duo rule | ACADEMe |
|----------|---------|
| 3 primitives | Same |
| Pill shadow | Same, on surface color |
| ~15 shapes | Same |
| Big eyes, asymmetric mouth | Same |
| Feather green world | **#5B6CFF + #7CFFB2** only |
| Guilt owl personality | **Patient peer coach, no shame** |
| Cast of humans + Duo | **One hero mascot first**; optional cast later |

Full build recipe: `SHAPE-LANGUAGE.md`  
New cast (redesign): `examples/v3-redesign-cast.svg` + `preview-v3-redesign.html`
