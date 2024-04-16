import { useStore } from "@/store/hooks";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const Clear = () => {
  const { store, dispatch } = useStore();
  return (
    <div className="clear-section">
      <AlertDialog>
        <AlertDialogTrigger>
          <FontAwesomeIcon icon={faTrash} />
        </AlertDialogTrigger>
        <AlertDialogContent className="w-80 clear-section__modal">
          <AlertDialogHeader>
            <AlertDialogTitle>Clear grid?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="clear-section__modal__cancel">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="clear-section__modal__ok"
              onClick={() => dispatch({ type: "RESETGRID" })}
            >
              Yes
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Clear;
