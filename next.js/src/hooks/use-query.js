import wpFetchData from '@/utils/wpFetchData';
import { useState, useEffect } from 'react';

export const useQuery = (query, obj) => {
  const { variables, onCompleted = () => { }, onError = () => { } } = obj || {}

  const [loading, setLoading] = useState(false);
  const [previousResponse, setPreviousResponse] = useState(null);
  const [response, setResponse] = useState({
    status: 'loading',
    body: null,
    error: null
  });

  const makeRequest = () => {
    setLoading(true)
    wpFetchData(query, variables)
      .then(({ status, body }) => {
        setLoading(false)
        onCompleted({
          status,
          body,
          error: null
        })
        if (response.body !== null || response.error !== null) setPreviousResponse(response)
        setResponse({
          status,
          body,
          error: null
        });
      })
      .catch(error => {
        onError(error)
        setLoading(false)
        if (response.body !== null || response.error !== null) setPreviousResponse(response)
        setResponse({
          status: 'error',
          body: null,
          error
        });
      });
  }

  useEffect(() => {
    makeRequest()
  }, [makeRequest]);

  return { revalidate: makeRequest, data: response, loading, previousResponse };
};