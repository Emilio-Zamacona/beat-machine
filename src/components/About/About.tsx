import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion, faEarthAmericas } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
const About = () => {
  return (
    <div className="clear-section">
      <AlertDialog>
        <AlertDialogTrigger>
          <FontAwesomeIcon icon={faQuestion} />
        </AlertDialogTrigger>
        <AlertDialogContent className="w-80 clear-section__modal">
          <AlertDialogHeader>
            <AlertDialogTitle>Made by Emilio Zamacona</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription className="flex gap-4 items-center">
            <span>Visit me on: </span>
            <a
              className="text-4xl"
              href="https://www.linkedin.com/in/emilio-zamacona"
            >
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            <a className="text-4xl" href="https://github.com/Emilio-Zamacona">
              <FontAwesomeIcon icon={faGithub} />
            </a>
            <a className="text-4xl" href="https://www.emiliozamacona.com/">
              <FontAwesomeIcon icon={faEarthAmericas} />
            </a>
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel className="clear-section__modal__cancel">
              Ok
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default About;
