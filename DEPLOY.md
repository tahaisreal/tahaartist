# Déploiement & Guide d'utilisation

## Lancement local (première fois)

```bash
# 1. Installer les dépendances
npm install

# 2. Créer le fichier d'environnement
cp .env.example .env.local
# Édite .env.local avec tes vraies valeurs

# 3. Créer la base de données
DATABASE_URL="file:./dev.db" npx prisma db push

# 4. Démarrer le serveur de dev
npm run dev
# → http://localhost:3000
# → Admin: http://localhost:3000/admin/login
```

## Variables d'environnement

| Variable | Description | Exemple |
|---|---|---|
| `DATABASE_URL` | Chemin SQLite | `file:./dev.db` |
| `NEXTAUTH_SECRET` | Secret JWT (32+ chars) | `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL du site en prod | `https://tonsite.com` |
| `ADMIN_EMAIL` | Email de connexion admin | `admin@tonsite.com` |
| `ADMIN_PASSWORD` | Mot de passe admin | Minimum 12 chars |

## Déploiement sur Vercel (recommandé)

```bash
# 1. Pousser sur GitHub
git init
git add .
git commit -m "Initial portfolio"
git remote add origin https://github.com/TON-USER/ton-repo.git
git push -u origin main

# 2. Sur vercel.com
# → Import GitHub repository
# → Framework: Next.js (auto-détecté)
# → Ajouter les variables d'environnement dans Settings > Environment Variables
# → Deploy
```

**Important sur Vercel :** Les uploads vidéo locaux ne persistent pas entre les déploiements (filesystem éphémère). Deux options :
- **Option A** : Utiliser Cloudinary pour stocker les vidéos (recommandé prod)
- **Option B** : Déployer sur un VPS (DigitalOcean, etc.) avec stockage persistant

## Personnalisation du contenu

**Changer le nom du studio :**
→ `src/components/Nav.tsx` — modifier "STUDIO"
→ `src/components/sections/HeroSection.tsx` — titre hero
→ `src/components/sections/ContactSection.tsx` — email, réseaux

**Changer les infos About :**
→ `src/components/sections/AboutSection.tsx`
→ Modifier `stats`, les skills, le texte de description

**Changer les couleurs :**
→ `tailwind.config.ts` — modifier `gold: '#C9A84C'`
→ `src/app/globals.css` — modifier `--gold`

## Utilisation de l'Admin

1. Aller sur `/admin/login`
2. Se connecter avec les credentials de `.env.local`
3. **Ajouter une vidéo YouTube** :
   - Menu → YouTube
   - Coller l'URL YouTube ou l'ID (ex: `dQw4w9WgXcQ`)
   - Remplir titre + description optionnelle
4. **Ajouter un motion design** :
   - Menu → Motion
   - Glisser-déposer un fichier MP4 ou MOV (max 500MB)
   - Remplir titre + description optionnelle
5. **Réordonner** : utiliser les flèches ↑↓ dans la liste

## Structure des dossiers

```
src/
├── app/
│   ├── page.tsx              ← Page d'accueil
│   ├── layout.tsx            ← Layout global
│   ├── admin/                ← Panel admin (protégé)
│   └── api/admin/            ← API REST
├── components/
│   ├── sections/             ← Hero, Work, About, Contact
│   ├── admin/                ← Composants admin
│   ├── YoutubeCard.tsx       ← Card vidéo YouTube
│   └── MotionCard.tsx        ← Card motion (lazy video)
└── lib/
    ├── prisma.ts             ← Client DB
    ├── auth.ts               ← Config NextAuth
    └── utils.ts              ← Helpers
prisma/
└── schema.prisma             ← Schéma BDD
public/
└── uploads/                  ← Vidéos uploadées (local)
```
