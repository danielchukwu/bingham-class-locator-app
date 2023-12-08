export default function Button({value, onClick, type='submit'}: {value: string, onClick?: () => void, type?: 'submit' | 'reset' | 'button'}) {
  return (
    <button type={type} onClick={onClick} className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-4 mr-2 mb-2">{value}</button>
  );
}