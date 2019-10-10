import React from "react";
import Helmet from "react-helmet";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostListing from "../components/PostListing/PostListing";
import SEO from "../components/SEO/SEO";

import config from "../../data/SiteConfig";
import { Container, Row, Col, Button } from "react-bootstrap";
import Sidebar from "../components/Sidebar/Sidebar";
import Calendar from "../components/Calendar/Calendar";
import { Member } from "../components/ExecomMembers/ExecomMembers";


const now = new Date();
const myEventsList = [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2019, 9, 0),
        end: new Date(2019, 9, 1),
    },
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2015, 3, 7),
        end: new Date(2015, 3, 10),
    },

    {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2016, 2, 13, 0, 0, 0),
        end: new Date(2016, 2, 20, 0, 0, 0),
    },

    {
        id: 3,
        title: 'DTS ENDS',
        start: new Date(2016, 10, 6, 0, 0, 0),
        end: new Date(2016, 10, 13, 0, 0, 0),
    },

    {
        id: 4,
        title: 'Some Event',
        start: new Date(2015, 3, 9, 0, 0, 0),
        end: new Date(2015, 3, 10, 0, 0, 0),
    },
    {
        id: 5,
        title: 'Conference',
        start: new Date(2015, 3, 11),
        end: new Date(2015, 3, 13),
        desc: 'Big conference for important people',
    },
    {
        id: 6,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 10, 30, 0, 0),
        end: new Date(2015, 3, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 7,
        title: 'Lunch',
        start: new Date(2015, 3, 12, 12, 0, 0, 0),
        end: new Date(2015, 3, 12, 13, 0, 0, 0),
        desc: 'Power lunch',
    },
    {
        id: 8,
        title: 'Meeting',
        start: new Date(2015, 3, 12, 14, 0, 0, 0),
        end: new Date(2015, 3, 12, 15, 0, 0, 0),
    },
    {
        id: 9,
        title: 'Happy Hour',
        start: new Date(2015, 3, 12, 17, 0, 0, 0),
        end: new Date(2015, 3, 12, 17, 30, 0, 0),
        desc: 'Most important meal of the day',
    },
    {
        id: 10,
        title: 'Dinner',
        start: new Date(2015, 3, 12, 20, 0, 0, 0),
        end: new Date(2015, 3, 12, 21, 0, 0, 0),
    },
    {
        id: 11,
        title: 'Birthday Party',
        start: new Date(2015, 3, 13, 7, 0, 0),
        end: new Date(2015, 3, 13, 10, 30, 0),
    },
    {
        id: 12,
        title: 'Late Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 18, 2, 0, 0),
    },
    {
        id: 12.5,
        title: 'Late Same Night Event',
        start: new Date(2015, 3, 17, 19, 30, 0),
        end: new Date(2015, 3, 17, 23, 30, 0),
    },
    {
        id: 13,
        title: 'Multi-day Event',
        start: new Date(2015, 3, 20, 19, 30, 0),
        end: new Date(2015, 3, 22, 2, 0, 0),
    },
    {
        id: 14,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 15,
        title: 'Point in Time Event',
        start: now,
        end: now,
    },
]


const Filler = () => (
    <div className="w-100" style={{ height: "200px", backgroundColor: 'grey' }} >
    </div>
);

class Index extends React.Component {
    render() {
        console.log(this.props.data)
        const postEdges = this.props.data.index.edges;
        const {execom} = this.props.data.execom.edges[0].node;
        return (
            <Layout>
                <Helmet title={config.siteTitle} />
                <SEO />
                {/* <PostListing postEdges={postEdges} /> */}
                <Row>
                    <Col>
                        <h3 className="boxed">
                            <span>IEEE SB GCEK</span>
                        </h3>
                        <div className="boxed-content">
                            <p className="text-muted">
                                The IEEE Student Branch of GCEK came into existence
                                on 5<sup>th</sup> June 2009. Since then we have conducted several
                                programs for the benefit of students.
                                The IEEE Head Quarters is regularly conducting contests in various
                                category in which students can participate. These are conducted globally
                                and the students get a chance to compete with students from Universities from other parts of the world.<br />
                                Our IAS and PELS chapters were officially inaugurated by Dr. Sanjeeb Kumar Panda, Director of Power and
                                Energy Section On March 11, 2019. It mainly focused on industry leadership in energy conservation and
                                environmental ,health issues. Several activities were organised under these chapters which got great
                                appreciation from the student members as well as from the teachers.<br />
                                The goal of the Student Branch is to provide a platform for the students where they can develop
                                co-curricular skills. The Student Branch stands for increasing the awareness of students
                                in co-academic matters, supplement their studies and help them reach higher professional
                                standards. It is hoped that the activities of the Student Branch will generate a genuine
                                interest among the students in their studies.
                            </p>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col>
                        <h3 className="boxed">
                            <span>Execom Members</span>
                        </h3>
                        <Row className="boxed-content">
                            {
                                execom.map(({execomName, execomColor, chair, key}) => {
                                    console.log(chair)
                                    let designation;
                                    if (execomName.toLowerCase() !== "student branch")
                                        designation = execomName.split(" ")[0] + " " + chair.designation;
                                    else
                                        designation = "SB " + chair.designation; 
                                    return (
                                        <Col md={3} key={key}>
                                            <Member name={chair.name} designation={designation} borderTopColor={execomColor} 
                                            image={chair.image} />
                                        </Col>
                                    )
                                })
                            }
                        </Row>
                        <Row className="mt-4">
                            <Col>
                                <Button href="/execom-members" block>See all members</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className="mt-5">
                    <Col md={12} lg={8} className="py-2 py-lg-0">
                        <Row>
                            <Col>
                                <h3 className="boxed">
                                    <span>Upcoming Events</span>
                                </h3>
                                <Row className="mt-4">
                                    <Col>
                                        <Filler />
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                        <Row className="mt-5">
                            <Col>
                                <h3 className="boxed">
                                    <span>Events</span>
                                </h3>
                                <Row className="mt-4">
                                    <Col>
                                        <Filler />
                                    </Col>
                                    <Col className="pl-0">
                                        <Filler />
                                    </Col>
                                </Row>
                                <Row className="mt-3">
                                    <Col>
                                        <Filler />
                                    </Col>
                                    <Col className="pl-0">
                                        <Filler />
                                    </Col>
                                </Row>
                                <Row className="mt-4">
                                    <Col>
                                        <a className="btn btn-primary btn-block" href="/events">See all Events</a>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={12} lg={4} className="py-2 py-lg-0">
                        <Sidebar />
                    </Col>
                </Row>
            </Layout>
        );
    }
}

export default Index;

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query {
    index: allMarkdownRemark(
      limit: 2000
      sort: { fields: [fields___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            date
          }
          excerpt
          timeToRead
          frontmatter {
            title
            tags
            featuredImage{
                childImageSharp{
                  fluid(maxWidth: 800, quality: 80){
                    ...GatsbyImageSharpFluid_withWebp
                  }
                }
            }
            date
          }
        }
      }
    }
    execom: allExecomMembersJson(
        filter: { year: { eq: "2019" } }
      ) {
        edges {
          node {
              execom{
                  execomName
                  execomColor
                  chair{
                      name
                      designation
                      image{
                          childImageSharp{
                              fluid(maxWidth: 180, quality: 100){
                                  ...GatsbyImageSharpFluid_withWebp
                              }
                          }
                      }
                  }
              }
          }
        }
      }
  }
`;
