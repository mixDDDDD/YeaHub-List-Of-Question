import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import Markdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import { normalizeAnswerHtml } from './normalizeAnswerHtml.ts';
import { normalizeCodeBlocks, normalizeParagraphs, highlightComponentNames } from './answerMarkup.ts';

const render = (answer) => {
  return renderToStaticMarkup(React.createElement(Markdown, {
    remarkPlugins: [normalizeAnswerHtml],
    rehypePlugins: [rehypeRaw, normalizeCodeBlocks, rehypeSanitize, normalizeParagraphs,
      [rehypeHighlight, { detect: false }], highlightComponentNames],
  }, answer));
};

test('fenced HTML example preserves its line break', () => {
  const html = render('```text\n<pre><code>first\nsecond</code></pre>\n```');
  assert.ok(html.includes('first\nsecond'));
  assert.ok(!html.includes('&amp;#10;'));
});

test('inline and indented code remain literal', () => {
  assert.ok(render('`<pre><code>x</code></pre>`').includes('&lt;pre&gt;'));
  assert.ok(render('    <pre><code>first\n    second</code></pre>').includes('first\nsecond'));
});

test('real HTML code retains whitespace and entities', () => {
  const html = render('<pre><code>first\n\t&lt;T&gt; &amp; last</code></pre>');
  assert.ok(html.includes('first\n\t&lt;T&gt; &amp; last'));
});

test('mixed HTML and fenced example preserve both line breaks', () => {
  const html = render('<pre><code>one\ntwo</code></pre>\n\n```text\n<pre><code>three\nfour</code></pre>\n```');
  assert.ok(html.includes('one\ntwo'));
  assert.ok(html.includes('three\nfour'));
});

test('unsafe HTML is sanitized', () => {
  const html = render('<script>alert(1)</script>\n\n<img src="x" onerror="alert(1)">\n\n<a href="javascript:alert(1)">link</a>');
  assert.ok(!/script|onerror|javascript:/i.test(html));
});

test('generic parameters retain names that collide with HTML tags', () => {
  for (const parameter of ['T', 'P', 'A', 'B', 'I', 'S', 'U']) {
    assert.ok(render(`Component<${parameter}>`).includes(`Component&lt;${parameter}&gt;`));
    assert.ok(render(`<p>Component<${parameter}></p>`).includes(`Component&lt;${parameter}&gt;`));
  }
  assert.ok(render('Promise<Array<string>>').includes('Promise&lt;Array&lt;string&gt;&gt;'));
});

test('paired uppercase HTML remains markup', () => {
  assert.ok(render('<P><STRONG>answer</STRONG></P>').includes('<p><strong>answer</strong></p>'));
});
