import { forwardRef, useId } from 'react';
import { classes } from 'utils/style';
import styles from './Monogram.module.css';

export const Monogram = forwardRef(({ highlight, className, ...props }, ref) => {
  const id = useId();
  const clipId = `${id}monogram-clip`;

  return (
    <div style={{ transform: 'rotate(180deg)' }}>
      <svg
        aria-hidden
        className={classes(styles.monogram, className)}
        width="46"
        height="29"
        viewBox="0 0 46 29"
        ref={ref}
        {...props}
      >
        <defs>
          <clipPath id={clipId}>
            <path d="M10 27V2h6l18 16.4V2h6v25h-6L16 10.6V27l-6-0z M15.2 5.8l16.6 15.1v-2.2L15.2 4z" fillRule="evenodd" clipRule="evenodd" />
          </clipPath>
        </defs>
        <rect clipPath={`url(#${clipId})`} width="100%" height="100%" />
        {highlight && (
          <g clipPath={`url(#${clipId})`}>
            <rect className={styles.highlight} width="100%" height="100%" />
          </g>
        )}
      </svg>
    </div>
  );
});
