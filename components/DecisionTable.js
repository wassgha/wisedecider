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
          label: <Value index={index} id={value.id} value={value.name} draggable />
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
      </div>
    )
  }
}

export default view(DecisionTable)
