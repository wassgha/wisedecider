import { Component } from 'react'
import StarRatingComponent from 'react-star-rating-component'

// Store
import worksheet from '../stores/worksheetStore'

class Score extends Component {
  render() {
    const { comment = '', score = 0, choiceId, valueId } = this.props
    return (
      <div className={'cell'}>
        {comment}
        <StarRatingComponent
          name={'rating'}
          onStarClick={newScore => {
            worksheet.rate(choiceId, valueId, newScore)
          }}
          starCount={5}
          value={score}
          editing={true}
        />

        <style jsx>{`
          .cell {
            background-color: rgba(0, 0, 0, ${score / 5});
            color: ${score < 2.5 ? '#333' : '#EEE'};
            border-radius: 50px;
            padding-right: 30px;
            padding-left: 30px;
          }
        `}</style>
      </div>
    )
  }
}

export default Score
