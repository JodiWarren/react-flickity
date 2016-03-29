var React = require('react')
var myFlickity = require('flickity-sync')
var refName = 'carousel'

var Flickity = React.createClass ({
  displayName: 'Flickity',

  propTypes: {
    disableImagesLoaded: React.PropTypes.bool,
    options: React.PropTypes.object,
    className: React.PropTypes.string,
    elementType: React.PropTypes.string,
    children: React.PropTypes.array,
  },

  componentWillMount: function () {
    this.state = {
      selectedIndex: 0
    }
  },

  componentDidMount: function () {
    var carousel = this.refs.carousel
    this.flkty = new myFlickity(carousel, this.props.options)
    this.flkty.on('cellSelect', this.updateSelected)
  },

  getDefaultProps: function () {
    return {
      disableImagesLoaded: false,
      options: {},
      className: '',
      elementType: 'div',
      carouselIndex: 0
    }
  },

  updateSelected: function () {
    var index = this.flkty.selectedIndex
    this.setState({
      selectedIndex: index
    })
  },

  componentWillUnmount: function () {
    if (this.flkty) {
      this.flkty.off('cellSelect', this.updateSelected)
      this.flkty.destroy()
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
      return nextState.selectedIndex !== this.state.selectedIndex;
  },

  componentDidUpdate: function() {
    if (this.flkty) {
      this.flkty.select( this.state.selectedIndex )
    }
  },

  render: function () {
    return React.createElement(this.props.elementType, {
      className: this.props.className,
      ref: refName
    }, this.props.children)
  }
});

module.exports = Flickity;
