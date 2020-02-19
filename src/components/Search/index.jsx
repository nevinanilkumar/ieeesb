import React, { useState, createRef, useMemo } from "react"
import {
  InstantSearch,
  Index,
  connectStateResults,
} from "react-instantsearch-dom"
import { useOnClickOutside } from "../../hooks"
import algoliasearch from "algoliasearch/lite"

import { Root, HitsWrapper, PoweredBy } from "./styles"
import Input from "./input"
import Hits from "./Hits"
// import * as hitComps from "./hitComps"

const Results = connectStateResults(
  ({ searching, searchState: state, searchResults: res }) =>
    (searching && <div>Searching...</div>) ||
    (res && res.nbHits === 0 && <div>No results for &apos;{state.query}&apos;</div>)
)

const Stats = connectStateResults(
  ({ searchResults: res }) =>
    res && res.nbHits > 0 && `${res.nbHits} result${res.nbHits > 1 ? `s` : ``}`
)

export default function Search({ indices, collapse, hitsAsGrid }) {
  const ref = createRef()
  const [query, setQuery] = useState(``)
  const [focus, setFocus] = useState(false)
  const appId = process.env.GATSBY_ALGOLIA_APP_ID
  const searchKey = process.env.GATSBY_ALGOLIA_SEARCH_KEY
  // useMemo prevents the searchClient from being recreated on every render.
  // Avoids unnecessary XHR requests (see https://tinyurl.com/yyj93r2s).
  const searchClient = useMemo(() => algoliasearch(appId, searchKey), [
    appId,
    searchKey,
  ])
  useOnClickOutside(ref, () => setFocus(false))

  return (
    <Root ref={ref}>
      <InstantSearch
        searchClient={searchClient}
        indexName={indices[0].name}
        onSearchStateChange={({ query }) => setQuery(query)}
      >
        <Input onFocus={() => setFocus(true)} {...{ collapse, focus }} />
        <HitsWrapper show={query && query.length > 0 && focus} asGrid={hitsAsGrid}>
          {indices.map(({ name, title, type }) => (
            <Index key={name} indexName={name}>
              <header>
                <h4>{title}</h4>
                <Stats />
              </header>
              <Results />
              <Hits type={type} onClick={() => setFocus(false)} />
            </Index>
          ))}
          <PoweredBy />
        </HitsWrapper>
      </InstantSearch>
    </Root>
  )
}