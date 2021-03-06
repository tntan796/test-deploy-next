import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link';
import styles from '../styles/Home.module.css'
import { getFiles } from './api/static-file';
interface PropTypes {
  products: any;
  fileContent: any;
}

function Home(props: PropTypes) {
  const {products, fileContent} = props;
  console.log(fileContent);
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h3>api content</h3>
      <div>
        <ul>
          {products.map((pro: any, index: number) => {
            return (
              <li key={index}>
                <Link href={`/static-path/${pro.Id}`}>
                  <p>{index} - {pro.Title}</p>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
      <h3>FIle content</h3>
      {
        fileContent.map((t: any, index: number) => {
          return (
            <div key={index}>
              <div>
                filename{t.fileName}
              </div>
              <div>
                Content: {t.content}
              </div>

            </div>
          )
        })
      }
    </div>
  )
}

// export async function getServerSideProps() {
//   const res = await fetch(`https://tano-api.herokuapp.com/products`);
//   const products = await res.json()
//   return {
//     props: {
//       products
//     }
//   }
// }

export async function getStaticProps({params}: any) {
  const res = await fetch(`https://hhq.somee.com/api/News?offSet=0&pageSize=0`);
  const products = (await res.json()).Data.Data;
  const fileContent = getFiles();
  console.log('filecontent:', fileContent);
  return {
    props: {
      products,
      fileContent
    },
  }
}

export default Home
