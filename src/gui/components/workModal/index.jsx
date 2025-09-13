import { useEffect } from "react";
import ReactDOM from "react-dom";
import Markdown from "react-markdown";
import PropTypes from "prop-types";
import { AiFillEye, AiFillGithub } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import "./workModal.scss";

const propTypes = {
  work: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    projectLink: PropTypes.string,
    codeLink: PropTypes.string,
    image: PropTypes.any,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  handleDisplay: PropTypes.func,
};

const defaultProps = {
  work: {
    title: "",
    description: "",
    projectLink: "",
    codeLink: "",
    image: "",
    tags: [],
  },
  handleDisplay: () => {},
};

const WorkModal = ({ work, handleDisplay } = defaultProps) => {
  const modalWrapper = document.createElement("div");

  useEffect(() => {
    modalWrapper.classList.add("work-modal");
    document.body.appendChild(modalWrapper);
    modalWrapper.focus();

    return () => {
      document.body.removeChild(modalWrapper);
    };
  }, [modalWrapper]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        className="work-modal__overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => handleDisplay(false)}
      >
        <motion.div
          className="work-modal__content"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="work-modal__header">
            <h3 className="bold-text">{work.title}</h3>
            <button
              className="work-modal__close"
              onClick={() => handleDisplay(false)}
            >
              ✕
            </button>
          </div>

          {/* Body */}
          <div className="work-modal__body">
            <div className="work-modal__description">
              <Markdown>{work.description}</Markdown>
              {work.tags?.length > 0 && (
                <div className="work-modal__tags">
                  {work.tags.map((tag, idx) => (
                    <span key={idx} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {work.image && (
              <div className="work-modal__image">
                <img src={work.image} alt={work.title} />
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="work-modal__footer">
            {work.projectLink && (
              <a
                href={work.projectLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillEye size={22} /> View Project
              </a>
            )}
            {work.codeLink && (
              <a
                href={work.codeLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub size={22} /> View Code
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    modalWrapper
  );
};

WorkModal.propTypes = propTypes;
export default WorkModal;
