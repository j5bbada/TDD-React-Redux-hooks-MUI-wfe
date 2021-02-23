import { useCallback } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

function useLoading(filter, actionFn, getDataFn, isFetchingFn, errorMessageFn) {
  const dispatch = useDispatch()
  const data = useSelector((state) => getDataFn(state, filter), [filter])
  const isFetching = useSelector((state) => isFetchingFn(state, filter), [filter])
  const errorMessage = useSelector((state) => errorMessageFn(state, filter), [filter])
  const handleFetch = useCallback(() => dispatch(actionFn(filter)), [actionFn, dispatch, filter])

  useEffect(() => {
    dispatch(actionFn)
  }, [actionFn, dispatch])

  return {
    data,
    isFetching,
    errorMessage,
    onFetch: handleFetch,
  }
}

export default useLoading
