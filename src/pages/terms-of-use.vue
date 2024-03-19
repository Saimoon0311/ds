<template lang="">
  <section class=" ">
    <div v-if="loginUserData && loginUserData.type == 'client'">
      <ClientHeader />
    </div>
    <div v-else-if="loginUserData && loginUserData.type == 'lawyer'">
      <LawyerHeader />
    </div>
    <div v-else>
      <GeneralHeader />
    </div>

    <div class="WordSection1 container pt-3">
      <h3 class="mt-3 text-center">Website Terms of Use</h3>

      <p class="LNMarginText">
        <span class="SpellE"
          ><span lang="EN-US" style="font-family: Montserrat"
            >Simplawfy</span
          ></span
        ><span lang="EN-US" style="font-family: Montserrat">
          Pty Ltd (<span class="SpellE"
            ><span class="LNDefinedTermChar"
              ><span style="font-family: Montserrat"
                ><b>Simplawfy</b></span
              ></span
            ></span
          >) owns and operates this website 'makinglawsimple.com.au' (<b
            style="mso-bidi-font-weight: 400: normal"
            >Website</b
          >). Access to and use of this Website<b
            style="mso-bidi-font-weight: 400: normal"
          >
          </b
          > and the products and services available through this Website
          (collectively,
          <span class="LNDefinedTermChar"
            ><span style="font-family: Montserrat"><b>Services</b></span></span
          >) is subject to the following terms, conditions and notices (<span
            class="LNDefinedTermChar"
            ><span style="font-family: Montserrat"
              ><b>Terms of Use</b></span
            ></span
          >). By using the Services, you acknowledge that you have read,
          understood and agree to be bound by the Terms of Use. If you do not
          agree to these Terms of Use, you must immediately cease usage of the
          Website and Services. <o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >1<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >Website access<o:p></o:p
        ></span>
      </p>

      <p class="LNIndentText1">
        Access to this Website is provided on an “as is” and “as available”
        basis, without any warranties of any kind, either expressed or implied.
        Simplawfy does not warrant that the Website will be available,
        uninterrupted, secure, or free of errors, defects or malware. Simplawfy
        reserves the right to withdraw, update, restrict or amend the Website or
        Services without notice.
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >2<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >User accounts and terms & conditions<o:p></o:p
        ></span>
      </p>

      <p class="LNIndentText1">
        You may create an account on this Website in order to use the Services,
        as a Client or Lawyer (as those terms are defined in the Terms &
        Conditions for Clients and Terms & Conditions for Lawyers as linked
        below):
      </p>

      <p class="LNText3" style="mso-list: l8 level3 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(a)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >If you are a Client, you also agree to be bound by the Terms &amp;
          Conditions for Clients, which is available
          <a target="_blank" href="app/terms-and-conditions-for-clients"
            >here</a
          >.<o:p></o:p
        ></span>
      </p>

      <p class="LNText3" style="mso-list: l8 level3 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(b)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >If you are a Lawyer, you also agree to be bound by the Terms &amp;
          Conditions for Lawyers, which is available
          <a target="_blank" href="app/terms-and-conditions-for-lawyers"
            >here</a
          >.<o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >3<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >Privacy policy<o:p></o:p
        ></span>
      </p>

      <p class="LNIndentText1">
        <span class="SpellE"
          ><span lang="EN-US" style="font-family: Montserrat"
            >Simplawfy's</span
          ></span
        ><span lang="EN-US" style="font-family: Montserrat">
          privacy policy, which sets out how your information is used, can be
          found
          <router-link to="/privacy-policy">here</router-link>. By using this Website, you consent to the processing described in the
          privacy policy and warrant that all data provided by you is
          accurate.<o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >4<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >Prohibitions<o:p></o:p
        ></span>
      </p>

      <p class="LNText3" style="mso-list: l8 level3 lfo8">
        <!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >You must not misuse this Website. Without limitation, you must not:
          <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(a)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >modify, adapt, copy, translate, sell, reverse engineer, decompile or
          disassemble (or attempt to do any of the preceding to) any part of the
          Website; <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(b)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >transmit or distribute a virus, trojan, worm, ransomware, spyware,
          adware, rogue software, wiper, keylogger, logic bomb, code injection,
          denial-of-service attack or any other malware or material which is
          malicious, technologically harmful, in breach of confidence or in any
          way offensive or obscene; <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(c)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >hack into, circumvent or bypass security or authentication on, or
          access without authorisation, any aspect of the Website or Service,
          including attempting to commit password cracking, social engineering,
          phishing attacks or destruction or corruption of data in relation to
          the Website, Service or its users; <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(d)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >attempt to disrupt, damage, limit or affect the performance or
          functionality of any computer facilities of or accessed through this
          Website; <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(e)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >use the Website or Services in a manner that is unlawful,
          unauthorised, inhibiting on any other person’s rights or use of the
          Website or Services, or an infringement of Simplawfy policies or the
          spirit of the Platform, including, but not limited to, acting under
          false pretenses by impersonating a Client, Lawyer or Simplawfy
          personnel in order to gain market or customer knowledge, or otherwise
          a competitive advantage; or <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(f)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >publish any content or communicate with other users in a manner that
          is unlawful, unsolicited advertising, threatening, harassing,
          defamatory, discriminatory, explicit, offensive, encouraging or
          inciting an illegal act, spam or machine- or randomly-generated,
          infringing of intellectual property rights (including copyright), or
          otherwise inappropriate. <o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >5<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >External sites <o:p></o:p
        ></span>
      </p>

      <p class="LNIndentText1">
        <span lang="EN-US" style="font-family: Montserrat"
          >This Website may contain links to other websites (<span
            class="LNDefinedTermChar"
            ><span style="font-family: Montserrat"
              ><b>External sites</b>
            </span></span
          >), which are not operated by <span class="SpellE">Simplawfy</span>.
          <span class="SpellE">Simplawfy</span> has no control over
          the External Sites and accepts no responsibility for them or for any
          loss or damage that may arise from your use of them. Your use of the
          External Sites will be subject to the terms of use and service
          contained within each such site.<o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >6<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >Linking to this Website <o:p></o:p
        ></span>
      </p>

      <p class="LNIndentText1">
        <span lang="EN-US" style="font-family: Montserrat"
          >You may link to this Website’s home page, provided you do so in a way
          that is fair and legal and does not damage our reputation or take
          advantage of it, but you must not establish a link in such a way as to
          suggest any form of association, approval or endorsement on our part
          where none exists. You must not establish a link from any website that
          is not owned by you. This Website must not be framed on any other
          site, nor may you create a link to any part of this Website other than
          the home page. Simplawfy reserves the right to withdraw linking
          permission without notice. <o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >7<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >Emails <o:p></o:p
        ></span>
      </p>

      <p class="LNIndentText1">
        <span lang="EN-US" style="font-family: Montserrat"
          >Simplawfy uses email to communicate with its users. From time to
          time, users may receive from Simplawfy: <o:p></o:p
        ></span>
      </p>
      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(a)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >emails directly from Simplawfy (<b>Info Emails</b>), such as in
          response to an enquiry you make to Simplawfy. You consent to the
          receipt of Info Emails on the basis of the context in which you have
          communicated with Simplawfy, as relevant. Info Emails therefore do not
          contain an unsubscribe link; <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(b)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >automatic system-generated emails based on their registration of an
          account as a Client or a Lawyer (<b>System Emails</b>). You consent to
          the receipt of System Emails on the basis of your registration as a
          Client or a Lawyer. System Emails are not marketing or promotional
          emails and therefore do not contain an unsubscribe link. If you no
          longer wish to receive System Emails, you must delete your account as
          Client or Lawyer (as appropriate); and <o:p></o:p
        ></span>
      </p>
      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(c)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >marketing emails (<b>Access Emails</b>). Users may request to be
          unsubscribed from Access Emails. <o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >8<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >Intellectual property rights <o:p></o:p
        ></span>
      </p>

      <p class="LNIndentText1">
        <span lang="EN-US" style="font-family: Montserrat"
          >All content on this Website (including text, graphics, logos, images
          and software) and the Services is protected by copyright under the
          laws of Australia and through international treaties. All intellectual
          property, including any copyrights, trade marks and patents, in the
          Website (and all its contents including text, graphics and logos),
          Services and these Terms of Use is owned by Simplawfy, and Simplawfy
          retains all rights, title and interest to the same, save for any
          original user-generated content posted to the Website by third
          parties, in respect of which ownership in the intellectual property is
          retained by the respective trade mark owner, but for which, by
          posting, you grant Simplawfy a non-exclusive, non-transferable,
          royalty free right to use for the sole purpose of allowing the content
          to be presented on the Website without Simplawfy violating any rights
          you have in it. You may store, print and display the content supplied
          solely for your own personal use. You are not permitted to publish,
          manipulate, distribute or otherwise reproduce, in any format, any of
          the content or copies of the content supplied to you or which appears
          on this Website nor may you use any such content in connection with
          any business or commercial enterprise. Unless you express otherwise in
          writing to Simplawfy, you acknowledge and agree that Simplawfy may use
          your logo, branding or other trade marks for Simplawfy’s marketing
          efforts and you grant to Simplawfy a non-exclusive, non-transferable,
          royalty free right to use the same. <o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >9<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >General information only <o:p></o:p
        ></span>
      </p>

      <p class="LNText3" style="mso-list: l8 level3 lfo8">
        <!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >Any information, opinions, statements and content published on the
          Website is provided for informational purposes only and is not
          intended as, nor does it constitute, legal, financial, taxation or
          expert advice. You should make your own inquiries and obtain
          independent advice based on your specific circumstances before acting
          or relying on the information. <o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >10<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >Limitation of liability <o:p></o:p
        ></span>
      </p>

      <p class="LNIndentText1">
        <span lang="EN-US" style="font-family: Montserrat"
          >Your use of the Website and Services is at your own risk. To the
          fullest extent permitted by law, and subject to any non-excludable
          consumer guarantees, Simplawfy expressly excludes all warranties and
          other terms which might otherwise be implied by statute, common law or
          equity, and will not be liable for, and you expressly release
          Simplawfy from, any loss or damages of any kind, including but without
          limitation any direct, indirect, special, consequential, punitive or
          incidental damages, or damages for loss of use, profits, data or other
          intangibles, damage to goodwill or reputation, or the cost of
          procurement of substitute goods and services, arising from or in
          connection to the use, inability to use, performance or failures of
          this Website, the Services or the External Sites, or any materials
          posted on the same. <o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >11<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat">
          Indemnity <o:p></o:p
        ></span>
      </p>

      <p class="LNIndentText1">
        <span lang="EN-US" style="font-family: Montserrat"
          >You agree to indemnify and hold harmless Simplawfy and its
          affiliates, officers, agents and employees from any claims, demands,
          liabilities, losses, costs or expenses (including without limitation
          solicitors and court costs), including from a third party, arising out
          of or in relation to your use of this Website or the Services, your
          breach of the Terms of Use or the law, or intellectual property
          infringement. <o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >12<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat">
          General <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(a)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >Simplawfy reserves the right to vary these Terms of Use, at any time,
          by updating this page. Any variations to the Terms of Use take
          immediate effect upon publication on this Website. Simplawfy
          encourages you to check this page often for any such variations. Your
          continued use of the Website and Services following publication
          constitute acceptance of any variations to the Terms of Use. If you do
          not agree to any variations to the Terms of Use, you must immediately
          cease using the Website and Services. <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(b)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >These Terms of Use are governed by the laws of Western Australia and
          the parties submit to the non-exclusive jurisdiction of the courts of
          Western Australia. <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(c)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >In these Terms of Use, headings are for convenience only and do not
          affect meaning. <o:p></o:p
        ></span>
      </p>

      <p class="LNText4" style="mso-list: l8 level4 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >(d)<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat"
          >If any part of these Terms of Use is found to be invalid or
          unenforceable by a court of competent jurisdiction, that part will be
          severed and the remainder of the Terms will continue in full force and
          effect. <o:p></o:p
        ></span>
      </p>

      <p class="LNNumberedHeading1" style="mso-list: l8 level1 lfo8">
        <!--[if !supportLists]--><span
          lang="EN-US"
          style="
                font-family: 'Montserrat', sans-serif;
            mso-fareast-    font-family: 'Montserrat', sans-serif;
            mso-bidi-    font-family: 'Montserrat', sans-serif;
          "
          ><span style="mso-list: Ignore"
            >13<span style="font: 7pt 'Times New Roman'"
              >&nbsp;&nbsp;
            </span></span
          ></span
        ><!--[endif]--><span lang="EN-US" style="font-family: Montserrat">
          Contacting us <o:p></o:p
        ></span>
      </p>

      <p class="LNIndentText1">
        <span lang="EN-US" style="font-family: Montserrat"
          >If you have any queries regarding these Terms of Use, the Website or
          the Services, please contact us via the Contact Us page or by emailing
          <a href="mailto:info@makinglawsimple.com.au"
            >info@makinglawsimple.com.au</a
          >. <o:p></o:p
        ></span>
      </p>
    </div>
    <div class="footer">
      <MainFooter />
    </div>
  </section>
</template>
<script>
import GeneralHeader from "../pages/GeneralHeader.vue";
import MainFooter from "../components/global/MainFooter.vue";
import ClientHeader from "../pages/client/Header.vue";
import LawyerHeader from "../pages/lawyer/Header.vue";

export default {
  components: {
    GeneralHeader,
    MainFooter,
    ClientHeader,
    LawyerHeader,
  },

  name: "terms-of-use",
};
</script>
<style scoped>
.LNNumberedHeading1 span {
  font-size: 14pt !important;
  font-weight: 400;
}
</style>
