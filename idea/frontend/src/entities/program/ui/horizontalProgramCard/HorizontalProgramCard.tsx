import { memo } from 'react';
import { Link, generatePath } from 'react-router-dom';
import { Metadata } from '@gear-js/api';

import { absoluteRoutes, routes } from 'shared/config';
import sendSVG from 'shared/assets/images/actions/send.svg';
import readSVG from 'shared/assets/images/actions/read.svg';
import { IdBlock } from 'shared/ui/idBlock';
import { BulbBlock } from 'shared/ui/bulbBlock';
import { TimestampBlock } from 'shared/ui/timestampBlock';
import { ActionLink } from 'shared/ui/ActionLink';
import { isState } from 'shared/helpers';

import styles from './HorizontalProgramCard.module.scss';
import { getBulbStatus } from '../../helpers';
import { IProgram, PROGRAM_STATUS_NAME } from '../../model';

type Props = {
  program: IProgram;
};

const HorizontalProgramCard = memo(({ program }: Props) => {
  const { id: programId, name, status, timestamp } = program;

  const statusName = PROGRAM_STATUS_NAME[status];

  const metaString = program.meta?.meta;
  const meta = metaString ? (JSON.parse(metaString) as Metadata) : undefined;

  return (
    <article className={styles.horizontalProgramCard}>
      <div className={styles.content}>
        <Link to={generatePath(absoluteRoutes.program, { programId })} className={styles.link}>
          <h2 className={styles.name}>{name}</h2>
        </Link>
        <div className={styles.otherInfo}>
          <IdBlock id={programId} size="medium" withIcon color="light" />
          <BulbBlock color="light" text={statusName} status={getBulbStatus(status)} />
          <TimestampBlock color="light" withIcon timestamp={timestamp} />
        </div>
      </div>
      <div className={styles.actions}>
        <ActionLink
          to={generatePath(absoluteRoutes.sendMessage, { programId })}
          icon={sendSVG}
          text="Send Message"
          className={styles.sendMessage}
        />
        {isState(meta) && (
          <ActionLink to={generatePath(routes.state, { programId })} icon={readSVG} text="Read State" />
        )}
      </div>
    </article>
  );
});

export { HorizontalProgramCard };