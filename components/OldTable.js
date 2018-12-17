import React from 'react'
import { SortableContainer, SortableElement, arrayMove } from 'react-sortable-hoc'
import { Table, Column, AutoSizer, defaultTableRowRenderer } from 'react-virtualized'

import tableCellRenderer from './TableCell'

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

class RouteEdit extends React.Component {
  state = {
    cols: [
      { dataKey: 'col1', label: 'Column1' },
      { dataKey: 'col2', label: 'Column2' },
      { dataKey: 'col3', label: 'Column13' }
    ],
    rows: [
      {
        col1: {
          value: 'Something',
          rating: 5
        },
        col2: {
          value: 'Something 2',
          rating: 3
        },
        col3: {
          value: 'Something 3',
          rating: 5
        }
      },
      {
        col1: {
          value: 'Something2',
          rating: 5
        },
        col2: {
          value: 'Something2 2',
          rating: 2.5
        },
        col3: {
          value: 'Something2 3',
          rating: 5
        }
      },
      {
        col1: {
          value: 'Something3 ',
          rating: 1
        },
        col2: {
          value: 'Something3 2',
          rating: 0
        },
        col3: {
          value: 'Something3 3',
          rating: 5
        }
      }
    ]
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState(state => ({
      rows: arrayMove(state.rows, oldIndex, newIndex)
    }))
  }

  onSortEndCols = ({ oldIndex, newIndex }) => {
    this.setState(state => ({
      cols: arrayMove(state.cols, oldIndex, newIndex)
    }))
  }

  render() {
    const { rows, cols } = this.state
    return (
      <div style={{ height: '100vh' }}>
        <AutoSizer>
          {({ width, height }) => (
            <SortableTable
              lockAxis="y"
              onSortEnd={this.onSortEnd}
              width={width}
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
                  onSortEnd={this.onSortEndCols}
                />
              )}
            >
              {cols.map(col => (
                <Column
                  {...col}
                  key={col.dataKey}
                  width={width / cols.length}
                  cellRenderer={tableCellRenderer}
                />
              ))}
            </SortableTable>
          )}
        </AutoSizer>
      </div>
    )
  }
}

export default RouteEdit
