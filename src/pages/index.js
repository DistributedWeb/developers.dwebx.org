import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

function Home() {
  return (
    <Layout>
      <header className={classnames('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">dWeb Documentation</h1>
        </div>
      </header>
      <main>
        <div className="container">
          <section className={styles['links-grid']}>
            <Link to="/introduction/welcome">
              <img src="/img/dweb-logo.png" style={{height:50,width:50}} /> <span>Introduction</span>
            </Link>
            {/* <Link to="/developers/using-the-editor">
              <img src="/img/editor-link-card.png" /> <span>Using the Editor</span>
            </Link>
            <Link to="/developers/syncing-with-folders">
              <img src="/img/folder-sync-controls.png" /> <span>Syncing with Folders</span>
            </Link>
            <Link to="/developers/importing-and-exporting-files">
              <img src="/img/import-export-link-card.png" /> <span>Importing and Exporting Files</span>
            </Link>
            <Link to="/developers/sharing-ddrives">
              <img src="/img/copy-url.png" /> <span>Sharing ddrive</span>
            </Link>
            <Link to="/developers/comparing-and-merging-ddrives">
              <img src="/img/menu-diff-merge.png" /> <span>Comparing and Merging</span>
            </Link> */}
          </section>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
