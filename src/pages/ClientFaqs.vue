<template lang="">
  <section class="faq-main">
    <!-- <GeneralHeader /> -->
    <ClientHeader />

    <div class="WordSection1 container">
      <!-- ----------- -->
      <h3 class="mt-3 mb-3" style="text-align: center">FAQs</h3>
      <!-- <ul class="nav nav-tabs nav-justified mb-3" id="ex1" role="tablist">
        <li class="nav-item" role="presentation">
          <a
            class="nav-link active"
            id="ex1-tab-1"
            data-bs-toggle="tab"
            href="#ex1-tabs-1"
            role="tab"
            aria-controls="ex1-tabs-1"
            aria-selected="true"
          >
            <p
              class="LNDocumentTitleShort tab-title"
              align="center"
              style="text-align: center"
            >
              <span
                style="
                  font-size: 15pt;
                  mso-bidi-font-size: 10.5pt;
                      font-family: 'Montserrat', sans-serif;
                  mso-fareast-font-family: Calibri;
                  text-transform: uppercase;
                  mso-ansi-language: EN-AU;
                  font-weight: 400: bold;
                "
                >Client Faq's<o:p></o:p
              ></span>
            </p>
          </a>
        </li>
        <li class="nav-item" role="presentation">
          <a
            class="nav-link"
            id="ex1-tab-2"
            data-bs-toggle="tab"
            href="#ex1-tabs-2"
            role="tab"
            aria-controls="ex1-tabs-2"
            aria-selected="false"
          >
            <p
              class="LNDocumentTitleShort tab-title"
              align="center"
              style="text-align: center"
            >
              <span
                style="
                  font-size: 15pt;
                  mso-bidi-font-size: 10.5pt;
                      font-family: 'Montserrat', sans-serif;
                  mso-fareast-font-family: Calibri;
                  text-transform: uppercase;
                  mso-ansi-language: EN-AU;
                  font-weight: 400: bold;
                "
                >LAWYER FAQ'S <o:p></o:p
              ></span>
            </p>
          </a>
        </li>
      </ul> -->

      <!-- --------- -->

      <!--c faqs ---------- -->
      <!-- ---------- -->
      <div class="accordion accordion-flush">
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingOne">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              <p
                class="LNNumberedHeading1 mt-2 mb-2"
                style="
                  margin-left: 0cm;
                  text-indent: 0cm;
                  mso-pagination: none;
                  page-break-after: auto;
                  mso-list: none;
                  tab-stops: 36pt;
                "
              >
                <span
                  lang="EN-US"
                  style="    font-family: 'Montserrat', sans-serif; font-weight: 400: normal"
                >
                  <b>I am considering posting a job, but</b>
                </span>
              </p>
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingOne"
            data-bs-parent=""
          >
            <div class="accordion-body">
              <div class="accordion" id="">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      What will it cost me to use the platform?
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      We do not charge you anything to use our platform. You may
                      need to pay fees to your lawyer and other costs associated
                      with your legal matter, depending on the proposal you
                      accept and the nature of your legal matter.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      I need a lawyer outside of Australia.
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Unfortunately, our platform currently only caters to
                      Australian lawyers. Please
                      <router-link to="/contact-us">contact us</router-link>
                      and let us know where you’re located, and we’ll let you
                      know if we have plans to expand our platform to include
                      lawyers in your country.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      The area of law my job relates to is not listed, or I am
                      not sure what the area of law is.
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Please select ‘I don’t know / Not listed here’ as the area
                      of law. We will categorize your job in the area of law
                      that most closely matches it.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading1One">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse1One"
                      aria-expanded="false"
                      aria-controls="collapse1One"
                    >
                      How will I know I’m dealing with a real lawyer?
                    </button>
                  </h2>
                  <div
                    id="collapse1One"
                    class="accordion-collapse collapse"
                    aria-labelledby="heading1One"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Anyone who applies to be a lawyer on our platform
                      undergoes a verification process to ensure that they are
                      registered to practice law in their state/territory, prior
                      to gaining access to the platform.
                    </div>
                  </div>
                </div>
              </div>
              <!-- --------- -->
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingTwo">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              <p
                class="LNNumberedHeading1 mt-2 mb-2"
                style="
                  margin-left: 0cm;
                  text-indent: 0cm;
                  mso-pagination: none;
                  page-break-after: auto;
                  mso-list: none;
                  tab-stops: 36pt;
                "
              >
                <span
                  lang="EN-US"
                  style="    font-family: 'Montserrat', sans-serif; font-weight: 400: normal"
                >
                  <b>I have posted a job, but</b>
                </span>
              </p>
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingTwo"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingFour">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      It’s been a while, and I haven’t received any proposals.
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFour"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      Please
                      <router-link to="/contact-us">contact us</router-link>
                      and let us know.
                    </div>
                  </div>
                </div>
              </div>
              <!-- -------- -->
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingThree">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              <p
                class="LNNumberedHeading1 mt-2 mb-2"
                style="
                  margin-left: 0cm;
                  text-indent: 0cm;
                  mso-pagination: none;
                  page-break-after: auto;
                  mso-list: none;
                  tab-stops: 36pt;
                "
              >
                <span
                  lang="EN-US"
                  style="    font-family: 'Montserrat', sans-serif; font-weight: 400: normal"
                >
                  <b>I have received a lawyer’s proposal, but</b>
                </span>
              </p>
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingThree"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingFive">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      I need more information from them before I make a decision
                      on it.
                    </button>
                  </h2>
                  <div
                    id="collapseFive"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingFive"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      You are free to message lawyers regarding their proposals,
                      if you require further information about them. Please note
                      that lawyers are only able to send one message to clients
                      before they submit a proposal — this is to avoid the
                      potential for harassment of clients. However, once you
                      message a lawyer back, the messaging channel will be
                      opened and you will be able to communicate freely, until
                      you accept or reject their proposal.
                    </div>
                  </div>
                </div>
              </div>
              <!-- -------   -->
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingf">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapsef"
              aria-expanded="false"
              aria-controls="flush-collapsef"
            >
              <p
                class="LNNumberedHeading1 mt-2 mb-2"
                style="
                  margin-left: 0cm;
                  text-indent: 0cm;
                  mso-pagination: none;
                  page-break-after: auto;
                  mso-list: none;
                  tab-stops: 36pt;
                "
              >
                <span
                  lang="EN-US"
                  style="    font-family: 'Montserrat', sans-serif; font-weight: 400: normal"
                >
                  <b>I have accepted a lawyer’s proposal, but</b>
                </span>
              </p>
            </button>
          </h2>
          <div
            id="flush-collapsef"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingf"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingSix">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSix"
                      aria-expanded="false"
                      aria-controls="collapseSix"
                    >
                      Why can’t I continue to message them through the platform?
                    </button>
                  </h2>
                  <div
                    id="collapseSix"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingSix"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      It is our intention that, once you have accepted a
                      lawyer’s proposal, you will continue your legal matter
                      directly with your lawyer. <br />
                      <br />

                      We will provide you with your lawyer’s contact details,
                      details of the job and accepted proposal, and a transcript
                      of any messages exchanged, so that you have everything you
                      need to continue corresponding with your lawyer directly.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingSeven">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseSeven"
                      aria-expanded="false"
                      aria-controls="collapseSeven"
                    >
                      I cannot contact them using the contact details provided.
                    </button>
                  </h2>
                  <div
                    id="collapseSeven"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingSeven"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      If you are unable to contact your lawyer using either
                      their email address or phone number provided to you when
                      you accept their proposal, please
                      <router-link to="/contact-us">contact us</router-link>
                      so that we can attempt to follow up with the lawyer.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading1Seven">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse1Seven"
                      aria-expanded="false"
                      aria-controls="collapse1Seven"
                    >
                      They have sent me a costs disclosure statement and/or a
                      costs agreement — what is this?
                    </button>
                  </h2>
                  <div
                    id="collapse1Seven"
                    class="accordion-collapse collapse"
                    aria-labelledby="heading1Seven"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      For most legal matters, lawyers are legally required to
                      provide you with a written costs disclosure statement
                      before starting to work for you. This document explains
                      your lawyer’s total estimated legal costs and how they
                      will charge, and it should also explain your legal rights
                      in relation to legal costs and bills. <br /><br />

                      A costs agreement is a more detailed, formal agreement
                      between you and your lawyer that explains how your lawyer
                      will structure your legal costs and may contain other
                      contractual terms. You have the right to require a costs
                      agreement, and your lawyer also has the right to require
                      one – in this case, your lawyer may require you to sign
                      the costs agreement before they start working for you.
                      <br /><br />

                      Generally, the details of the costs disclosure statement
                      and the costs agreement should match the terms of the
                      lawyer’s proposal that you have accepted through the
                      platform. If they do not match, see <button
                          class="accordion-button collapsed cstm-accor"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse2Seven"
                          aria-expanded="false"
                          aria-controls="collapse2Seven"
                          id="scToItem"
                          v-on:click="hideButtonAndScroll()"
                        >Why don’t the details
                      of the costs disclosure statement or costs agreement match
                      the proposal I accepted?</button>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading22Seven">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse2Seven"
                      aria-expanded="false"
                      aria-controls="collapse2Seven"
                    >
                      Why don’t the details of the costs disclosure statement or
                      costs agreement match the proposal I accepted?
                    </button>
                  </h2>
                  <div
                    id="collapse2Seven"
                    class="accordion-collapse collapse"
                    aria-labelledby="heading2Seven"
                    data-bs-parent="#accordionExample"
                  >
                    <div class="accordion-body">
                      The details of the costs disclosure statement or costs
                      agreement should generally match the terms of the proposal
                      you accepted through the platform. If this is not the
                      case, please
                      <router-link to="/contact-us">contact us</router-link>
                      us and let us know about your issue, so that we can
                      investigate it further. For an explanation of the costs
                      disclosure statement or costs agreement, see <button
                          class="accordion-button collapsed cstm-accor"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapse1Seven"
                          aria-expanded="false"
                          aria-controls="collapse1Seven"
                          id="scToItem"
                          v-on:click="hideButtonAndScroll()"
                        >They have
                      sent me a costs disclosure statement and/or a costs
                      agreement – what is this?</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- -------   -->
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingff">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseff"
              aria-expanded="false"
              aria-controls="flush-collapseff"
            >
              <p
                class="LNNumberedHeading1 mt-2 mb-2"
                style="
                  margin-left: 0cm;
                  text-indent: 0cm;
                  mso-pagination: none;
                  page-break-after: auto;
                  mso-list: none;
                  tab-stops: 36pt;
                "
              >
                <span
                  lang="EN-US"
                  style="    font-family: 'Montserrat', sans-serif; font-weight: 400: normal"
                >
                  <b>I want to message a lawyer through the platform, but</b>
                </span>
              </p>
            </button>
          </h2>
          <div
            id="flush-collapseff"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingff"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <div class="accordion" id="accordionExamplea">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingEight">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseEight"
                      aria-expanded="false"
                      aria-controls="collapseEight"
                    >
                      Why can’t I ask for or provide personal contact details?
                    </button>
                  </h2>
                  <div
                    id="collapseEight"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingEight"
                    data-bs-parent="#accordionExamplea"
                  >
                    <div class="accordion-body">
                      To avoid the potential of harassment of clients, and
                      clients abandoning the platform before accepting a
                      lawyer’s proposal, we intend that clients and lawyers
                      communicate exclusively through the platform, until a
                      client has accepted a lawyer’s proposal. Once that
                      happens, we will exchange the contact details of the
                      client and lawyer, so that they can communicate further
                      off the platform.
                    </div>
                  </div>
                </div>
              </div>
              <!-- -------   -->
            </div>
          </div>
        </div>
        <!-- --------- -->
        <div class="accordion-item">
          <h2 class="accordion-header" id="flush-headingsix">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapsesix"
              aria-expanded="false"
              aria-controls="flush-collapsesix"
            >
              <p
                class="LNNumberedHeading1 mt-2 mb-2"
                style="
                  margin-left: 0cm;
                  text-indent: 0cm;
                  mso-pagination: none;
                  page-break-after: auto;
                  mso-list: none;
                  tab-stops: 36pt;
                "
              >
                <span
                  lang="EN-US"
                  style="    font-family: 'Montserrat', sans-serif; font-weight: 400: normal"
                >
                  <b
                    >I have completed a legal matter with a lawyer through the
                    platform, but
                  </b>
                </span>
              </p>
            </button>
          </h2>
          <div
            id="flush-collapsesix"
            class="accordion-collapse collapse"
            aria-labelledby="flush-headingsix"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              <div class="accordion" id="accordionExamplea">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading1Eight">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse1Eight"
                      aria-expanded="false"
                      aria-controls="collapse1Eight"
                    >
                      I wasn't happy with their quality of service, conduct,
                      legal costs (or anything else).
                    </button>
                  </h2>
                  <div
                    id="collapse1Eight"
                    class="accordion-collapse collapse"
                    aria-labelledby="heading1Eight"
                    data-bs-parent="#accordionExamplea"
                  >
                    <div class="accordion-body">
                      It is our mission to improve an individual’s experience
                      with the legal industry. So, if you’ve had a negative
                      experience with a lawyer, we want to know about it. We
                      encourage you to complete the following steps:
                      <ul class="style-num">
                        <li>
                          <router-link to="/contact-us">Contact us</router-link>
                          to let us know, and also contact your lawyer directly
                          to give them the opportunity to resolve the issues you
                          have.
                        </li>
                        <li>Leave a review or rating for your lawyer.</li>
                        <li>
                          Consider making a formal complaint to the legal
                          regulator / complaints body in your state/territory:
                          <ul>
                            <li>
                              <a
                                target="_blank"
                                href="https://www.lawsociety.com.au/for-the-public/making-a-complaint"
                              >
                                New South Wales
                              </a>
                            </li>
                            <li>
                              <a
                                target="_blank"
                                href="https://lsbc.vic.gov.au/consumers/complaints"
                              >
                                Victoria
                              </a>
                            </li>
                            <li>
                              <a
                                target="_blank"
                                href="https://www.lsc.qld.gov.au/complaints"
                              >
                                Queensland
                              </a>
                            </li>
                            <li>
                              <a
                                target="_blank"
                                href="https://www.lpbwa.org.au/the-complaint-process"
                              >
                                Western Australia
                              </a>
                            </li>
                            <li>
                              <a
                                target="_blank"
                                href="https://lpcc.sa.gov.au/complain"
                              >
                                South Australia
                              </a>
                            </li>
                            <li>
                              <a
                                target="_blank"
                                href="https://www.lpbt.com.au/complaints-process/"
                                >Tasmania
                              </a>
                            </li>
                            <li>
                              <a
                                target="_blank"
                                href="https://www.actlawsociety.asn.au/for-the-public/making-a-complaint"
                                >Australian Capital Territory
                              </a>
                            </li>
                            <li>
                              <a
                                target="_blank"
                                href="https://lawsocietynt.asn.au/community/complaints.html"
                              >
                                Northern Territory
                              </a>
                            </li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="heading12Eight">
                    <button
                      class="accordion-button collapsed"
                      style="font-weight: 400: 600"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapse12Eight"
                      aria-expanded="false"
                      aria-controls="collapse12Eight"
                    >
                      I have a new legal matter. Do I need to use the platform
                      again to post a new job?
                    </button>
                  </h2>
                  <div
                    id="collapse12Eight"
                    class="accordion-collapse collapse"
                    aria-labelledby="heading12Eight"
                    data-bs-parent="#accordionExamplea"
                  >
                    <div class="accordion-body">
                      No, you are under no obligation to do so. We are thrilled
                      that you were able to find a lawyer for your legal matter,
                      and that you want to maintain a relationship with them for
                      your new legal matter. However, you are always welcome to
                      post a new job on the platform to find other lawyers if
                      you want a second opinion or need assistance in an area of
                      law not covered by your lawyer.
                    </div>
                  </div>
                </div>
              </div>
              <!-- -------   -->
            </div>
          </div>
        </div>
      </div>
      <!-- ---------- -->

      <p
        class="LNNumberedHeading1 mt-4 mb-1"
        style="
          margin-left: 0cm;
          text-indent: 0cm;
          mso-pagination: none;
          page-break-after: auto;
          mso-list: none;
          tab-stops: 36pt;
        "
      >
        <span
          lang="EN-US"
          style="    font-family: 'Montserrat', sans-serif; font-weight: 400: normal"
        >
          <b>I have a question that isn’t listed here.</b>
        </span>
      </p>
      <p class="pb-5 n-mb">
        Please <router-link to="/contact-us">contact us</router-link> and let us
        know about your issue, and we will do our best to help.
      </p>

      <!-- ----------     -->
    </div>
    <div class="footer footer-ct">
      <MainFooter />
    </div>
  </section>
</template>
<script>
import MainFooter from "../components/global/MainFooter.vue";
// import GeneralHeader from "./GeneralHeader.vue";
import ClientHeader from "../pages/client/Header.vue";

export default {
  components: {
    MainFooter,
    ClientHeader,
  },

  name: "FaqS",
};
</script>
<style scoped>
a,
a:hover {
  color: #000;
}
.LNNumberedHeading1 span {
  font-weight: 400 !important;
  font-size: 21px !important;
  color: black;
}
section.faq-main b {
  font-weight: 400;
}
.accordion-item {
  border: none !important;
  border-bottom: 1px solid #d1d1d1 !important;
}

.accordion-button:focus {
  box-shadow: none;
}

.accordion-button:not(.collapsed) {
  background-color: #000;
  color: #fff;
}

.accordion-button:not(.collapsed) span,
.accordion-button:not(.collapsed)::after {
  filter: brightness(0) invert(1);
}

.hd-b {
  margin-bottom: 10px;
}

.accordion-button {
  padding: 13px 10px !important;
  font-weight: 400 !important;
  font-size: 17px;
}

.nav.nav-tabs .nav-link.active {
  border: none;
  border-bottom: 5px solid #000;
}

.nav.nav-tabs .nav-link {
  border: none;
  border-bottom: 5px solid #e2e2e2;
}

.tab-title {
  margin-bottom: 6px;
  color: #000;
}

.accordion-body {
  /* font-weight: 400: 600; */
  font-size: 15px;
}

.footer-ct {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.faq-main {
  min-height: 100vh;
  position: relative;
}

.n-mb {
  margin-bottom: 0px !important;
  padding-bottom: 70px !important;
}
.cstm-accor {
    width: auto !important;
    display: inline-block;
    font-size: 15px;
    font-weight: 400 !important;
    color: #000 !important;
    text-decoration: underline;
    padding: 0 !important;
}
.cstm-accor::after{
  content: unset !important;
}

.accordion-button.cstm-accor:not(.collapsed) {
    background-color: transparent;
    color: #000;
    text-decoration: underline;
}
.accordion-button.cstm-accor:not(.collapsed) {
  background-color: transparent;
  color: rgba(var(--bs-link-color-rgb), var(--bs-link-opacity, 1));
  text-decoration: underline;
}
ul.style-num {
  list-style: auto;
}
</style>
