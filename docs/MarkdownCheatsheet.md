# Markdown Cheatsheet
A basic markdown cheatsheet by example.

## Headers
# H1
## H2
### H3
#### H4
##### H5
###### H6

Alt-H1
======

Alt-H2
------

## Lists
1. First ordered list item
2. Another item
1. Actual numbers don't matter, just that it's a number
4. And another item.

Bulletpoints
* Unordered list can use asterisks
- Or minuses
+ Or pluses

## Links
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links. 
http://www.example.com or <http://www.example.com> and sometimes 
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

## Code Blocks & Syntax Highlighting
```javascript
var s = "JavaScript syntax highlighting";
alert(s);
```

## Tables
| Tables        | Are                   | Cool  |
| ------------- |:--------------------: | -----:|
| col 3 is      | right-aligned         | $1600 |
| col 2 is      | centered              | $12 |
| col 1 is      | default left-aligned  | $1 |

## Images
Inline-style: 
![alt text](https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 1")

Reference-style: 
![alt text][logo]

[logo]: https://github.com/adam-p/markdown-here/raw/master/src/common/images/icon48.png "Logo Title Text 2"

## Blockquotes
> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote. 

## Horizontal Rules
Three or more...

---

Hyphens

***

Asterisks

___

Underscores