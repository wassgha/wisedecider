import React from 'react'
import { Table, Column, AutoSizer, defaultTableRowRenderer } from 'react-virtualized'
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc'
import { view } from 'react-easy-state'
import _ from 'lodash'

// Store
import worksheet from '../store'

// Components
import Value from './Value'
import Choice from './Choice'
import Score from './Score'
import DecisionTableCell from './DecisionTableCell'

const ROW_HEIGHT = 100

const SortableTable = SortableContainer(Table)
const SortableTableRowRenderer = SortableElement(defaultTableRowRenderer)
const SortableHeader = SortableElement(({ children, ...props }) =>
  React.cloneElement(children, props)
)
const SortableHeaderRowRenderer = SortableContainer(({ className, columns, style }) => (
  <div className={className} role="row" style={style}>
    {React.Children.map(columns, (column, index) => (
      <SortableHeader index={index}>{column}</SortableHeader>
    ))}
  </div>
))
const SortableHandleCreator = SortableHandle(({ children, ...props }) =>
  React.cloneElement(children, props)
)

const tableCellRenderer = data => {
  const { dataKey, rowIndex, colIndex } = data
  return <DecisionTableCell data={data} />
}

class DecisionTable extends React.Component {
  render() {
    const { choices, values, scores } = worksheet
    const data = {
      cols: [
        ...(values.length > 0
          ? [
              {
                dataKey: 'choice',
                label: 'Choices'
              }
            ]
          : []),
        ...values.map((value, index) => ({
          dataKey: value.id,
          label: <Value index={index} id={value.id} value={value.name} draggable expand />
        }))
      ],
      rows: choices.map((choice, index) => ({
        ..._.mapValues(scores[choice.id], ({ comment, score }, valueId) => (
          <Score choiceId={choice.id} valueId={valueId} score={score} comment={comment} />
        )),
        choice: (
          <SortableHandleCreator>
            <Choice
              index={index}
              id={choice.id}
              value={choice.name}
              color={choice.color}
              draggable
              expand
            />
          </SortableHandleCreator>
        )
      }))
    }
    const { rows, cols } = data
    return (
      <div style={{ height: '100vh', width: '100vw', overflowX: 'scroll' }}>
        <AutoSizer>
          {({ width, height }) => {
            const finalWidth = Math.max(width, 300 * values.length)
            return (
              <SortableTable
                lockAxis="y"
                onSortEnd={worksheet.moveChoice}
                width={finalWidth}
                height={height}
                autoHeight
                headerHeight={ROW_HEIGHT}
                rowHeight={ROW_HEIGHT}
                rowCount={rows.length}
                rowGetter={({ index }) => rows[index]}
                rowRenderer={params => <SortableTableRowRenderer {...params} />}
                headerRowRenderer={params => (
                  <SortableHeaderRowRenderer
                    {...params}
                    axis="x"
                    lockAxis="x"
                    onSortEnd={worksheet.moveValue}
                  />
                )}
                useDragHandle={true}
              >
                {cols.map(col => (
                  <Column
                    {...col}
                    width={finalWidth / values.length}
                    cellRenderer={tableCellRenderer}
                  />
                ))}
              </SortableTable>
            )
          }}
        </AutoSizer>
        <style jsx global>
          {`
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

            .ReactVirtualized__Table__headerTruncatedText {
              display: inline;
              width: auto;
              white-space: normal;
              text-overflow: clip;
              overflow: auto;
            }

            /* List default theme */

            .ReactVirtualized__List {
            }
          `}
        </style>
      </div>
    )
  }
}

export default view(DecisionTable)
