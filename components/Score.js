import { Component } from 'react'
import ContentEditable from 'react-contenteditable'
import StarRatingComponent from 'react-star-rating-component'

// Store
import worksheet from '../store'

class Score extends Component {
  render() {
    const { comment = '', score = 0, choiceId, valueId } = this.props
    const textColor = score < 2.5 ? '#333333' : '#EEEEEE'
    const starColor = score < 2.5 ? '#000000' : '#FFFFFF'
    return (
      <div className={'cell'}>
        <ContentEditable
          html={comment}
          disabled={false}
          onChange={evt => {
            worksheet.rate(choiceId, valueId, undefined, evt.target.value)
          }}
          tagName={'span'}
          className={'text'}
          style={{
            color: textColor,
            cursor: 'text',
            whiteSpace: 'normal',
            fontSize: 14
          }}
          placeholder={'No comment yet.'}
        />
        <StarRatingComponent
          name={'rating'}
          onStarClick={newScore => {
            worksheet.rate(choiceId, valueId, newScore)
          }}
          emptyStarColor={starColor + '44'}
          starCount={5}
          value={score}
          editing={true}
        />
        <style jsx>{`
          .cell {
            display: flex;
            flex: 1;
            padding: 16px;
            flex-direction: column;
            align-items: center;
            background-color: rgba(0, 0, 0, ${score / 5});
            color: ${textColor};
            border-radius: 8px;
            padding: 16px;
            max-width: 100%;
            max-height: 100%;
            width: 100%;
            height: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default Score
