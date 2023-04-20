import React, { Component } from 'react';
import xtype from 'xtypejs';

import { defaultProps, propTypes } from '../components/Accordion.react';
import './accordion.css';

class Accordion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sectionsOpen: new Array(this.props.accordionHeadings.length).fill(false),
      allSectionsAreOpen: false,
    }
  }

  openOrCloseAccordionSection = (index) => {
    let sectionsOpen = [...this.state.sectionsOpen];
    sectionsOpen[index] = !sectionsOpen[index];
    this.setState({sectionsOpen: sectionsOpen, allSectionsAreOpen: sectionsOpen.every(sectionIsOpen => sectionIsOpen)});
  }

  showOrHideAllAccordionSections = () => {
    let sectionsOpen = new Array(this.state.sectionsOpen.length).fill(this.state.allSectionsAreOpen ? false : true);
    this.setState({ sectionsOpen: sectionsOpen, allSectionsAreOpen : !this.state.allSectionsAreOpen});
  } 


  render() {
    let accordionContent 
    if (this.props.children.length === 1 || xtype.type(this.props.children) !== 'array'){                     
      accordionContent = this.renderAccordionSection(0, this.props.children, this.state.sectionsOpen[0])
    }
    else { 
      accordionContent = this.props.children.map((accordionSectionContent, index) => this.renderAccordionSection(index, accordionSectionContent, this.state.sectionsOpen[index]))
    }
    return (
      <div className="js-enabled">
        <div className="govuk-accordion" data-module="govuk-accordion" id={this.props.id}>
          <div className='govuk-accordion__controls'>
            <button 
                type='button' 
                className='govuk-accordion__show-all' 
                onClick={this.showOrHideAllAccordionSections} 
                aria-label={`Accordion with ${this.props.accordionHeadings.length} sections, press enter to ${this.state.allSectionsAreOpen ? "close" : "open"} all sections`}
            >
            <span className= {this.state.allSectionsAreOpen ? "govuk-accordion-nav__chevron" : "govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down"} ></span>
            <span className="govuk-accordion__section-toggle-text"> {this.state.allSectionsAreOpen ? "Hide all sections" : "Show all sections"} </span>
            </button>
          </div>
          {accordionContent}
        </div>
      </div>
    )
  }

  renderAccordionSection(index, accordionSectionContent, sectionIsOpen) {
    const accordionHeading = this.props.accordionHeadings[index]
    const contentId = `accordion-default-content-${index}`;
    return (
          <div className={sectionIsOpen ? "govuk-accordion__section govuk-accordion__section--expanded" : "govuk-accordion__section"}>
            <div className="govuk-accordion__section-header">
              <h2 className="govuk-accordion__section-heading">
                <button 
                    className="accordion-button govuk-accordion__section-button" 
                    type="button" 
                    aria-controls={contentId} 
                    // aria-expanded={sectionIsOpen} not needed now we read all the info in the aria-label?
                    aria-label={
                      sectionIsOpen
                        ? `Accordion heading at level ${index} is ${accordionHeading},,,, Section is open, press Enter to close`
                        : `Accordion heading at level ${index} is ${accordionHeading},,,, Section is closed, press Enter to open`
                    }
                    onClick={() => this.openOrCloseAccordionSection(index)}
                >
                  <span className="govuk-accordion__section-heading-text" >
                    <span className="govuk-accordion__section-heading-text-focus"> {accordionHeading} 
                    </span>
                  </span> 
                  <span className="govuk-visually-hidden govuk-accordion__section-heading-divider"></span>
                  <span className="govuk-accordion__section-toggle" data-nosnippet>
                    <span className="govuk-accordion__section-toggle-focus">
                      <span className="moj-side-navigation__item--collapsed">
                      </span>
                    </span>
                    <span className= {sectionIsOpen ?  "govuk-accordion-nav__chevron" : "govuk-accordion-nav__chevron govuk-accordion-nav__chevron--down"} ></span>
                    <span className="govuk-accordion__section-toggle-focus govuk-accordion__section-toggle-text"> {sectionIsOpen ? "Hide" : "Show"} 
                      {/* <span className="govuk-visually-hidden"> this section</span> */}
                    </span>
                  </span>
                </button>
              </h2>
            </div>
            <div 
                className="govuk-accordion__section-content" 
                id={contentId} 
                aria-label={`Accordion at level ${index} content is`}
            >
                <p className='govuk-body'>{accordionSectionContent}</p>
            </div>
          </div> 
        )
    }
  }




Accordion.defaultProps = defaultProps;
Accordion.propTypes = propTypes;

export default Accordion