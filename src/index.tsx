import React from 'react';
import ReactDOM from 'react-dom';
import { CircleLoader } from 'react-spinners';
import { useRemoteData } from './react-remote-data';

const QuoteOfTheDay: React.FC = () => {
  const loadState = useRemoteData(async () => {
    const res = await fetch("https://favqs.com/api/qotd");
    return await res.json();
  });
  
  if (!loadState.loaded) {
    return <CircleLoader size={30} />
  } else if (loadState.error) {
    return <pre>{ JSON.stringify(loadState.error) }</pre>
  } else {
    const quote = loadState.data.quote;
    return (
      <p>
        “{quote.body}” – <a href={quote.url}>{quote.author}</a>
      </p>
    );
  }
};

ReactDOM.render(
  <QuoteOfTheDay />,
  document.getElementById('root')
);