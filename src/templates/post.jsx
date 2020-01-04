import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import Img from "gatsby-image";
import UserInfo from "../components/UserInfo/UserInfo";
import Disqus from "../components/Disqus/Disqus";
import PostTags from "../components/PostTags/PostTags";
import SocialLinks from "../components/SocialLinks/SocialLinks";
import SEO from "../components/SEO/SEO";
import config from "../../data/SiteConfig";
import "./b16-tomorrow-dark.css";
import "./post.scss";
import Sidebar from "../components/Sidebar/Sidebar";
import { IconContext } from "react-icons";
import { FaCalendarAlt } from "react-icons/fa";

import { Row, Col, Card } from "react-bootstrap";
/* <IconContext.Provider value={{ style: { verticalAlign: 'middle' } }}></IconContext.Provider> */ 

const Filler = () => (
  <div className="w-100" style={{ height: "350px", backgroundColor: 'grey' }} >
  </div>
);


export default class PostTemplate extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const { slug, nextslug, prevslug } = pageContext;
    const postNode = data.markdownRemark;
    const post = postNode.frontmatter;
    if (!post.id) {
      post.id = slug;
    }
    if (!post.category_id) {
      post.category_id = config.postDefaultCategoryID;
    }
    return (
      <Layout>
        <Helmet>
          <title>{`${post.title} | ${config.siteTitle}`}</title>
        </Helmet>
        <SEO postPath={slug} postNode={postNode} postSEO />
        <Row>
          <Col lg={8} md={12}>
            <h1 className="mb-3">{post.title}</h1>
            <div 
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "3px 0px"
              }}>
              <FaCalendarAlt className="text-muted" />
              <span className="text-muted ml-2" style={{fontSize: "90%"}}>
                  {post.date}
              </span>
            </div>
            <PostTags tags={post.tags} />
            <Card className="mt-4 border-0">
              <Img 
                fluid={post.featuredImage.childImageSharp.fluid} 
                placeholderStyle={{ filter: "blur(20px)" }} 
                className="card-img-top" />
              <Card.Body>
                {post.venue && <div className="mt-1"> <strong>Venue: </strong>{post.venue} </div> }
                <div className="post-content mt-3 mb-5" dangerouslySetInnerHTML={{ __html: postNode.html }} />
                
              </Card.Body>
              <Card.Footer>
                <div className="d-flex justify-content-between">
                  <a className="btn btn-primary" href={prevslug}>Previous</a>
                  <a className="btn btn-primary" href={nextslug}>Next</a>
                </div>
              </Card.Footer>
            </Card>
            <div className="my-5">
              <h3 className="text-center">Share this post</h3>
              <SocialLinks postPath={slug} postNode={postNode} />
            </div>

            {/* <h1>{post.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: postNode.html }} />
            <div className="post-meta mt-5">
              
              <SocialLinks postPath={slug} postNode={postNode} />
            </div>
            */}
            {/* <UserInfo config={config} /> */}
            <Disqus postNode={postNode} />
          </Col>
          <Col md={12} lg={4} className="py-2 py-lg-0">
            <Sidebar type="secondary" />
          </Col>
        </Row>
      </Layout>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      timeToRead
      excerpt(
        pruneLength: 50,
        truncate:true
      )
      frontmatter {
        title
        date(formatString: "MMM Do YYYY")
        category
        tags
        venue
        featuredImage{
          childImageSharp{
            fluid(maxWidth: 800, quality: 80){
                ...GatsbyImageSharpFluid_withWebp
                
            }
          }
        }
      }
      fields {
        slug
        date
      }
    }
  }
`;
