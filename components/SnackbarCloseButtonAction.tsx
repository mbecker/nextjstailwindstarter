import { XIcon } from "@heroicons/react/solid";
import { SnackbarKey, useSnackbar } from "notistack";

type Props = {
  key: SnackbarKey;
};

export default function SnackbarCloseButton({ key }: Props) {
  const { closeSnackbar } = useSnackbar();
  return (
    <button
      onClick={() => closeSnackbar(key)}
      className="py-2 px-4 inline-flex items-center text-slate-100"
    >
      <span className="sr-only">Close</span>
      <XIcon className="w-5 h-5" />
    </button>
  );
}
