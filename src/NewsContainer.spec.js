import React from 'react'
import { shallow } from 'enzyme'
import { NewsContainer } from './NewsContainer'

describe('News container', () => {
  const props = {
    news: {
      data: [],
      isLoading: false,
      errorMsg: null,
    },
    onGetNews: () => {},
  }

  describe('News container initial', () => {
    const newsContainer = shallow(<NewsContainer {...props} />)

    it('not render <p>', () => {
      expect(newsContainer.find('p')).toHaveLength(0)
    })

    it('not render <NewsList />', () => {
      expect(newsContainer.find('NewsList')).toHaveLength(0)
    })
  })

  describe('News container isLoading', () => {
    const nextProps = {
      ...props,
      news: {
        ...props.news,
        isLoading: true,
      },
    }

    const newsContainer = shallow(<NewsContainer {...nextProps} />)

    it('renders preloader', () => {
      expect(newsContainer.find('p').text()).toEqual('Loading...')
    })

    it('render only one <p>', () => {
      expect(newsContainer.find('p')).toHaveLength(1)
    })

    it('not render <NewsList />', () => {
      expect(newsContainer.find('NewsList')).toHaveLength(0)
    })
  })

  describe('News container render <NewsList />', () => {
    const nextProps = {
      ...props,
      news: {
        ...props.news,
        data: [1],
      },
    }

    const newsContainer = shallow(<NewsContainer {...nextProps} />)

    it('not render <p>', () => {
      expect(newsContainer.find('p')).toHaveLength(0)
    })

    it('renders <NewsList /> template', () => {
      expect(newsContainer.find('NewsList')).toHaveLength(1)
    })
  })

  describe('News container with errorMsg', () => {
    const nextProps = {
      ...props,
      news: {
        ...props.news,
        errorMsg: 'Something going wrong',
      },
    }

    const newsContainer = shallow(<NewsContainer {...nextProps} />)

    it('renders errorMsg', () => {
      expect(newsContainer.find('p').text()).toEqual(nextProps.news.errorMsg)
    })

    it('render only one <p>', () => {
      expect(newsContainer.find('p')).toHaveLength(1)
    })

    it('not render <NewsList />', () => {
      expect(newsContainer.find('NewsList')).toHaveLength(0)
    })
  })
})