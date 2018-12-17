import { Component } from 'react'
import reactCSS from 'reactcss'
import { SketchPicker } from 'react-color'
import { view, store } from 'react-easy-state'

class ColorPicker extends Component {
  constructor(props) {
    super(props)
    this.colorPickerState = store({
      displayColorPicker: false
    })
  }

  handleClick = () => {
    this.colorPickerState.displayColorPicker = !this.colorPickerState.displayColorPicker
  }

  handleClose = () => {
    this.colorPickerState.displayColorPicker = false
  }

  render() {
    const { onChange, color } = this.props
    const styles = reactCSS({
      default: {
        color: {
          width: '36px',
          borderRadius: '2px',
          background: color,
          display: 'inline-block',
          marginRight: '10px'
        },
        colorHex: {
          fontSize: 14
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'flex',
          maxWidth: '100px',
          cursor: 'pointer'
        },
        popover: {
          position: 'absolute',
          zIndex: '2'
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        }
      }
    })

    return (
      <div>
        <div style={styles.swatch} onClick={this.handleClick}>
          <div style={styles.color} />
          <span style={styles.colorHex}>{color}</span>
        </div>
        {this.colorPickerState.displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} />
            <SketchPicker color={color} onChange={onChange} />
          </div>
        ) : null}
      </div>
    )
  }
}

export default view(ColorPicker)
