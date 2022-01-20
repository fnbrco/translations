# fnbr.co translations

UI Translations for [fnbr.co](https://fnbr.co). As of now it is *not* planned to translate all Fortnite cosmetics due to volume.

## How can I contribute?

**Please note before starting to translate**: The website does not yet support languages that are written from right to left (e.g. Arabic, Hebrew and Persian/Farsi), so pull requests for such languages are put on hold and neither reviewed nor merged. In such cases, we recommend waiting until the technical requirement is met before translating a language that is written from right to left.

Create a pull request with your changes, language files are named `[two-letter code].json`, you can find a list of two letter language codes [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).  
For example `en.json` for English, `es.json` for Spanish, `pt.json` for Portuguese and so on.

The `en.json` will always be updated with the latest text to translate, so use that as a base and just translate what you can of your language!  
If a string does not exist in the file it will default to English.  

There are a few things to remember:
- Don't use Google Translate or other online translation tools, as these lack context and can come up with some very strange results.
- Text inside square brackets (that's `[` and `]`) such as `[language]` needs to remain in English (unless it is followed by `(` and `)` making it a link - see below), as it is normally replaced when the page is loaded with dyanmic data such as the date.
- Links are done similar to markdown, `[text here](https://example.com)` the closing square bracket and first round bracket need to stay together.
- At the top of the file where the `name` attribute is, this should be the name of the language in that language, so that it is easily recognisable for speakers.
- Underneath that, also put `name-en`, which is the name of the language in English. This is optional.
- [`thForDate`](https://github.com/fnbrco/translations/blob/master/en.json#L6) means if st, nd, rd and th should be put after the date. For example in English it is used like this: `January 8th 2019`.

In your pull request tell us your Discord name and discriminator and we will give you a Translator role on our Discord, make your [fnbr.co account](https://fnbr.co/oauth) have no adverts and credit you as a thank you.

## Links and formatting

Links are in a similar format to [Markdown](https://help.github.com/articles/basic-writing-and-formatting-syntax/#links), it can also have 'modifiers' by using `|` to separate them.  
If the text should be a link, the url must be the first modifier in use. If the text is not a link the modifiers can be in any order.

| Modifier | Description | Options |
| --- | --- | --- |
| URL | A HTTP/HTTPS link  |
| `newtab` | Makes the link open in a new tab | `true` |
| `class` | Adds CSS classes | Any CSS class |
| `tooltip` | Adds the title and alt attributes | Text to show on hover |
| `bold` | Makes the text bold | `true` |

For example:  

- `[new tab link](https://fnbr.co|newtab=true)` uses the newtab modifier for the link.
- `[bold text](bold=true)` uses just the bold modifier and is not a link.
- `[bold new tab link](https://fnbr.co|newtab=true|bold=true)` uses both the bold and newtab modifiers for the link

