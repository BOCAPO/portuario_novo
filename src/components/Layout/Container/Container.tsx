import scss from './Container.module.scss';
import { TContainerProps } from './types';

const Container: React.FC<TContainerProps> = (props) => {
  const containerClass = [scss.section];

  const renderContent = () => (
    <div className={scss.content}>{props.children}</div>
  );

  const renderDiv = () => (
    <div className={containerClass.join(' ')}>{renderContent()}</div>
  );

  const renderSection = () => (
    <section id={props.id} className={containerClass.join(' ')}>
      {renderContent()}
    </section>
  );

  if (props.className) containerClass.push(props.className);
  if (props.backgroundColor) containerClass.push(scss[props.backgroundColor]);

  return props.id ? renderSection() : renderDiv();
};
export default Container;
