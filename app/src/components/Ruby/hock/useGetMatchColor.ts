export const useGetMatchColor = (checkTarget?: ICheckTarget) => {
  if (!checkTarget || !checkTarget.result) return 'bg-gray-200'
  if (checkTarget.result?.is_match) return 'bg-green-200'
  return 'bg-rose-300'
}