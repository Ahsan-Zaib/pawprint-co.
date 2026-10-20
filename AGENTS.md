<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Service catalogue, example pricing rules, WhatsApp helper live in src/lib/site.ts — single source until pricing moves to the database.

- Homepage presentation lives in the index route with shared visual tokens and responsive tile rules in the global stylesheet; keep service data and booking logic separate to allow visual changes without changing business rules.
- Scroll reveals prepare semantic text through React and observe individual text/photo elements, not whole sections, so lower content animates only when reached and reduced-motion visitors retain immediate access.
- Use the shared PetTypeSelect for pet species entry across home, quote and booking so suggested and custom species remain consistent; preserve existing service slugs and option IDs when renaming displayed categories to keep links and saved selections working.
