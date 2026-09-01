# MutaCare Project Context

Last explored: 2026-09-01
Baseline commit: `bb17c63` (`main`)
Purpose: durable orientation for future contributors and coding-agent sessions. Verify this document against the code when the baseline commit has changed.

## Product

MutaCare is an Indonesian-language mobile therapy companion for people experiencing selective mutism. The implemented journey introduces the product, authenticates a user, gathers an initial assessment, displays a therapy summary, and lands on an early dashboard shell.

Primary user flow:

1. Splash screen (`/`) waits three seconds.
2. Three onboarding screens explain the product (`/onboarding`, `/onboarding/step-2`, `/onboarding/step-3`).
3. The user signs in or registers (`/auth/login`, `/auth/register`).
4. Successful auth always routes to the assessment intro (`/assessment`).
5. The user completes the assessment (`/assessment/questions`).
6. A successful submission routes to the result (`/assessment/result`).
7. The result CTA enters the tabbed dashboard (`/dashboard`).

There are currently no route guards, onboarding-completion persistence, or logic to skip assessment for returning users.

## Technical baseline

- Expo SDK 57 (`expo ~57.0.11`), React Native 0.86.2, React 19.2.3, TypeScript 6.0.3 in strict mode.
- Expo Router provides file-based routing from `src/app`; typed routes and React Compiler are enabled in `app.json`.
- NativeWind 4 + Tailwind CSS 3 provide most styling.
- Zustand 5 holds auth and assessment state.
- `@rn-primitives/*` supplies accessible UI primitives; local wrappers live under `src/components/ui` and follow react-native-reusables/shadcn-style patterns.
- Phosphor icons are made NativeWind-compatible with `src/lib/iconWithClassName.ts`.
- SVG imports use `react-native-svg-transformer`; local fonts are loaded in `src/app/_layout.tsx`.
- The app is portrait-first, supports Android/iOS/web, uses Metro for web, and declares the `femutacare` URL scheme.

Before writing code, follow `AGENTS.md` and read the exact Expo 57 documentation at <https://docs.expo.dev/versions/v57.0.0/>. Expo 57 targets React Native 0.86 and React 19.2.3, which matches this project.

## Repository map

- `src/app/`: Expo Router screens and layouts.
- `src/components/ui/`: reusable primitives (`Button`, `Text`, `Input`, `Checkbox`, `RadioGroup`, `Progress`, and related wrappers).
- `src/components/auth/`, `assessment/`, `dashboard/`, `onboarding/`: feature-specific presentation components.
- `src/store/`: Zustand stores containing async actions and transient app state.
- `src/services/`: typed backend endpoint adapters.
- `src/lib/api.ts`: base URL selection, bearer-token injection, JSON envelope parsing, and shared request errors.
- `src/hooks/useAssessment.ts`: orchestration between the assessment UI, stores, API submission, and router.
- `src/data/assessment.ts`: nine local fallback questions grouped into three stages.
- `assets/`: MutaCare SVG logo, onboarding/assessment illustrations, five mood/anxiety images, Google logo, Feather Bold, and the Poppins font family.

## Navigation and screens

`src/app/_layout.tsx` is a headerless root stack. It configures Reanimated logging, keeps the native splash visible until fonts resolve, imports global NativeWind CSS, and loads the bundled fonts.

The dashboard is a four-tab layout:

- `index`: implemented static home with header/streak, mood picker, and daily-practice empty state.
- `journey`: placeholder.
- `progress`: placeholder.
- `profile`: a nested four-screen account flow with the profile menu, editable account form, password form, and initial-assessment summary.

The Profile edit and password forms currently manage values and validation locally because the backend exposes no profile-update or password-change endpoint. The assessment summary reads the latest in-memory assessment result and falls back to the reference content when no result is available.

The dashboard header currently uses a hard-coded name, remote Unsplash avatar, and static streak. Mood selection is component-local and is not saved or sent to an API. The daily-practice card is static.

The standalone Refleksi flow is implemented under `/reflection` as five screens matching the Figma sequence: introduction, mood selection, achievement selection, a free-form note, and completion. `src/components/reflection/` contains its shared shell and check-row presentation, while `src/store/useReflectionStore.ts` holds the selected mood, achievements, and note in memory. The completion CTA clears that temporary state and returns to `/dashboard/journey`. There is not yet an entry point into this flow from the dashboard.

## State and backend contract

The API base URL is selected in this order:

1. `EXPO_PUBLIC_API_URL`.
2. The Metro host IP plus `:5000/api/v1` when available.
3. Android fallback `http://192.168.1.7:5000/api/v1`.
4. Other-platform fallback `http://localhost:5000/api/v1`.

`apiFetch` assumes every response is JSON shaped as `{ success, message, data?, error? }`. It adds `Content-Type: application/json`, optionally adds `Authorization: Bearer <token>`, and throws when HTTP status or envelope success is false.

Implemented endpoints:

- `POST /auth/register`
- `POST /auth/login`
- `GET /assessments/questions`
- `POST /assessments` with `{ answersPayload: Record<number, string[]> }`

Auth responses are expected to include a user and optional session with access token, refresh token, and expiry. Assessment results include severity, anxiety values, practices, target, recommendations, AI summary, and therapy-plan metadata.

All Zustand stores are memory-only: they do not use persistence middleware or secure storage. Reloading the app loses the user, tokens, assessment data, and in-progress reflection. Logout clears only in-memory auth data. Refresh tokens and expiry values are typed but unused.

Assessment behavior:

- Fetches questions from the API on mounting the question flow.
- Falls back silently to the nine local questions if fetching fails.
- Supports radio and checkbox answers; question 7 limits selection to three.
- Requires at least one selected answer before advancing.
- Submits only after the final question.
- Renders backend result values when present, otherwise uses hard-coded result placeholders.

## UI conventions

- Product copy is Indonesian and generally uses title-style capitalization.
- Primary visual language: soft green, mint, and amber/yellow; rounded cards and controls; Poppins body typography and Feather Bold display typography.
- Reuse `src/components/ui` primitives and `cn()` from `src/lib/utils.ts` before introducing one-off alternatives.
- Prefer the `@/` alias for `src` and `@/assets/` for assets.
- Feature screens are mostly composition layers; reusable presentation belongs in the corresponding `src/components/<feature>` directory.
- App screens commonly use `SafeAreaView` from `react-native-safe-area-context`.

## Commands and validation

- Install: `npm install`
- Start Metro: `npm start` or `npx expo start`
- Platforms: `npm run android`, `npm run ios`, `npm run web`
- Type-check: `npx tsc --noEmit` (use `npx.cmd` in Windows PowerShell environments that block `npx.ps1`)
- Lint script: `npm run lint`, although no ESLint configuration/package is currently checked in.

At the baseline commit, `npx.cmd tsc --noEmit --pretty false` passes.

## Known gaps and cautions

- `README.md` contains unresolved Git merge-conflict markers and still mostly contains the create-expo-app template.
- `package.json` defines `reset-project`, but the referenced `scripts/reset-project.js` is absent.
- No tests or test configuration are present.
- No checked-in `.env` example documents `EXPO_PUBLIC_API_URL`.
- No auth/session persistence, refresh-token flow, route protection, or server-side user bootstrap exists.
- Login and registration Google buttons are visual only.
- Dashboard data and three dashboard tabs are placeholders.
- `src/components/auth/form-input.tsx` appears unfinished and is currently unused.
- `useAssessment` checks a captured `error` value after submission; navigation behavior on a failed request deserves care when that flow is changed.
- Checkbox/radio option rows delegate selection both from the row and the nested control; interaction changes should be tested for duplicate toggles.
- Some text read through PowerShell displays mojibake for punctuation/bullets; preserve source-file encoding when editing user-facing copy.
- The repository has a Gemini PR-review workflow but no build, lint, type-check, or test CI workflow.

## Change discipline

- Preserve the current backend envelope and endpoint contracts unless a coordinated backend change is explicitly in scope.
- Do not rely on this document alone for volatile details; compare the current commit and inspect affected files.
- Update this context when architecture, core flows, backend contracts, or project-wide conventions materially change.
