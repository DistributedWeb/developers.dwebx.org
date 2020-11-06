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
          <h1 className="hero__title">dBrowser Documentation</h1>
        </div>
      </header>
      <main>
        <div className="container">
          <section className={styles['links-grid']}>
            <Link to="/developers/creating-new-ddrives">
              <img src="/img/create-drive-link-card.png" /> <span>Creating New ddrive</span>
            </Link>
            <Link to="/developers/using-the-editor">
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
            </Link>
          </section>
          <div className="row">
            <div className={classnames('col col--6', styles.section)}>
              <h2 id="apis">APIs</h2>
              <ul className={styles['links-list']}>
                <li><Link to="/apis/dbrowser.capabilities"><span>dbrowser.capabilities</span><span>Create temporary, revocable URLs which map to ddrives.</span></Link></li>
                <li><Link to="/apis/dbrowser.contacts"><span>dbrowser.contacts</span><span>Read and manage the user's address book.</span></Link></li>
                <li><Link to="/apis/dbrowser.ddrive"><span>dbrowser.ddrive</span><span>Methods to read and write Hyperdrive data.</span></Link></li>
                <li><Link to="/apis/dbrowser.markdown"><span>dbrowser.markdown</span><span>Render Markdown into HTML.</span></Link></li>
                <li><Link to="/apis/dbrowser.panes"><span>dbrowser.panes</span><span>Interact with other active panes in the tab.</span></Link></li>
                <li><Link to="/apis/dbrowser.peersockets"><span>dbrowser.peersockets</span><span>Send and receive messages to peers on a ddrive.</span></Link></li>
                <li><Link to="/apis/dbrowser.shell"><span>dbrowser.shell</span><span>Global user interface methods, typically user dialogs.</span></Link></li>
                <li><Link to="/apis/dbrowser.terminal"><span>dbrowser.terminal</span><span>Register commands which are accessible from Webterm.</span></Link></li>
              </ul>
            </div>
            <div className={classnames('col col--6', styles.section)}>
              <h2 id="developers">Developers</h2>
              <ul className={styles['links-list']}>
                <li><Link to="/developers/changing-a-ddrive-title-or-thumbnail"><span>changing a ddrive title or thumbnail</span></Link></li>
                <li><Link to="/developers/cloning-ddrives"><span>cloning ddrive</span></Link></li>
                <li><Link to="/developers/comparing-and-merging-ddrives"><span>comparing and merging ddrives</span></Link></li>
                <li><Link to="/developers/creating-files-and-folders"><span>creating files and folders</span></Link></li>
                <li><Link to="/developers/creating-mounts"><span>creating mounts</span></Link></li>
                <li><Link to="/developers/creating-new-ddrives"><span>creating new ddrives</span></Link></li>
                <li><Link to="/developers/editing-file-metadata"><span>Editing file metadata</span></Link></li>
                <li><Link to="/developers/hosting-ddrives"><span>Hosting ddrives</span></Link></li>
                <li><Link to="/developers/importing-and-exporting-files"><span>Importing and Exporting files</span></Link></li>
                <li><Link to="/developers/sharing-ddrives"><span>sharing ddrives</span></Link></li>
                <li><Link to="/developers/syncing-with-folders"><span>syncing with folders</span></Link></li>
                <li><Link to="/developers/using-the-editor"><span>Using the editor</span></Link></li>
                <li><Link to="/developers/using-the-terminal"><span>Using the terminal</span></Link></li>
                <li><Link to="/developers/your-system-ddrive"><span>Your system-ddrive</span></Link></li>
              </ul>
            </div>
            <div className={classnames('col col--6', styles.section)}>
              <h2 id="developers">Resource</h2>
              <ul className={styles['links-list']}>
                <li><Link to="/resources/content-type-negotiation"><span>Introduction to Hyperdrive</span><span>An overview of dBrowser's peer-to-peer tech</span></Link></li>
                <li><Link to="/resources/frontends-.ui-folder"><span>Index.json Manifest</span><span>Information about the ddrive manifest file, <code>index.json</code>.</span></Link></li>
                <li><Link to="/resources/goto-files"><span>Content-Type Negotiation</span><span>How <code>dweb://</code> handles URLs without extensions.</span></Link></li>
                <li><Link to="/resources/hole-punchability"><span>Frontends (.ui folder)</span><span>A tool to inject HTML output into every browsed resource.</span></Link></li>
                <li><Link to="/resources/index.json-manifest"><span>Goto Files</span><span>Files which act like shortcuts.</span></Link></li>
                <li><Link to="/resources/what-is-a-ddrive"><span>Introduction to Hyperdrive</span><span>An overview of dBrowser's peer-to-peer tech</span></Link></li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default Home;
