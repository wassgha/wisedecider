import css from 'styled-jsx/css'

export default css.global`@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,700,800&subset=latin,latin-ext');

* {
  z-index: 0;
  outline: none;
}

html {
  margin: 0px;
  padding: 0px;
}

body {
  font-size: 18px;
  font-family: Open Sans, sans-serif;
  font-weight: 400;
  color: #333;
  background: white;
  margin: 0px;
  line-height: 2;
}

[contenteditable='true']:empty:before {
  content: attr(placeholder);
  display: block;
  color: #aaa;
}

.cell {
  display: flex;
  flex: 1;
  padding: 15px;
  flex-direction: column;
  align-items: center;
}

/* Collection default theme */

.ReactVirtualized__Collection {
}

.ReactVirtualized__Collection__innerScrollContainer {
}

/* Grid default theme */

.ReactVirtualized__Grid {
}

.ReactVirtualized__Grid__innerScrollContainer {
}

/* Table default theme */

.ReactVirtualized__Table {
}

.ReactVirtualized__Table__Grid {
}

.ReactVirtualized__Table__headerRow {
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.ReactVirtualized__Table__row {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.ReactVirtualized__Table__headerTruncatedText {
  display: inline-block;
  max-width: 100%;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}

.ReactVirtualized__Table__headerColumn,
.ReactVirtualized__Table__rowColumn {
  margin-right: 10px;
  min-width: 0px;
  text-align: center;
}
.ReactVirtualized__Table__rowColumn {
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ReactVirtualized__Table__headerColumn:first-of-type,
.ReactVirtualized__Table__rowColumn:first-of-type {
  margin-left: 10px;
}
.ReactVirtualized__Table__sortableHeaderColumn {
  cursor: pointer;
}

.ReactVirtualized__Table__sortableHeaderIconContainer {
  display: flex;
  align-items: center;
}
.ReactVirtualized__Table__sortableHeaderIcon {
  flex: 0 0 24px;
  height: 1em;
  width: 1em;
  fill: currentColor;
}

/* List default theme */

.ReactVirtualized__List {
}`
