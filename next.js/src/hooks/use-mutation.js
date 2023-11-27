import wpFetchData from "@/utils/wpFetchData";
import { useCallback, useState } from "react";

export const useMutation = (query, { variables, onCompleted = () => { }, onError = () => { }}) => {
  if (!query) throw new Error('Query is required')

  const makeRequest = useCallback((props) => {
    setLoading(true)
    wpFetchData(query, (props?.variables || variables || undefined))
      .then(({ body }) => {
        setLoading(false)
        onCompleted({
          status: 'success',
          body,
          error: null
        })
        if (response.body !== null || response.error !== null) setPreviousResponse(response)
        setResponse({
          status: 'success',
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
  }, [])

  const [loading, setLoading] = useState(false);
  const [previousResponse, setPreviousResponse] = useState(null);
  const [response, setResponse] = useState({
    status: 'loading',
    body: null,
    error: null
  });

  return { request: makeRequest, data: response, loading, previousResponse };
}