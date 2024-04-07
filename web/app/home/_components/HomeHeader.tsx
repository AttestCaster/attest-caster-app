import { clsx } from 'clsx';
import Button from '@/components/Button/Button';

// import CodeBlock from '@/components/code-block/CodeBlock';
import Header from '@/components/layout/header/Header';
import useFields from '../_hooks/useFields';
import styles from './Home.module.css';
import InputText from './InputText';
import Label from './Label';



// const codeStep1 = `\`\`\`bash
// $ npx @coinbase/build-onchain-apps@latest create`;

const initFields = {
  castId: '',
};

type Fields = {
  castId: string;
};

export default function HomeHeader() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fields, setField, resetFields } = useFields<Fields>(initFields);

  return (
    <div className={styles.HomeHeader}>
      <div className={styles.HomeHeaderGradient} />
      <Header />
      <div className="flex flex-col items-center justify-center">
        <h1 className={clsx(styles.HomeHeaderHeadline, 'font-robotoMono')}>
          AttestCaster
          <br />
          
          <br />
          
        </h1>
        <p className={styles.HomeHeaderParagraph}>
          Attest the casts
          <br />
          Build a better social network.
        </p>
        {/* <div className={styles.HomeHeaderCta}>
          <CodeBlock code={codeStep1} />
        </div> */}
        <div>
          <div className="mb-5">
            <Label htmlFor="CastID">Cast</Label>
            <InputText
              id="castId"
              placeholder="Cast Id or Cast URL"
              // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
              onChange={(evt) => setField('castId', evt.target.value)}
              disabled={false}
              required
            />
            <Button
              buttonContent={
                <>
                  Attest
                </>
              }
              type="submit"
              // onClick={}
              disabled={false}
            />
          </div>
        </div>
      </div>
      <div className={styles.HomeHeaderWaves}>
        <div className={styles.homeBoatContainer}>
          <div className={styles.homeBoatInnerContainer}>
            <div className={styles.homeBoatLeftSail} />
            <div className={styles.homeBoatLeftSail2} />
            <div className={styles.homeBoatCenterSail} />
            <div className={styles.homeBoatRightSail} />
            <div className={styles.homeBoatTop} />
            <div className={styles.homeBoatCenter} />
            <div className={styles.homeBoatBottom} />
          </div>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          shapeRendering="auto"
        >
          <defs>
            <path
              id="boat-wave"
              d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
            />
          </defs>
          <g className={styles.HomeHeaderWavesParallax}>
            <use xlinkHref="#boat-wave" x="48" y="7" fill="rgba(82, 156, 248, 1)" />
            <use xlinkHref="#boat-wave" x="48" y="0" fill="rgba(82, 156, 248, 1)" />
            <use xlinkHref="#boat-wave" x="48" y="3" fill="rgba(82, 156, 248, 0.7)" />
            <use xlinkHref="#boat-wave" x="48" y="5" fill="rgba(82, 156, 248, 0.5)" />
            <use xlinkHref="#boat-wave" x="48" y="7" fill="rgba(82, 174, 255, 0.3)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
