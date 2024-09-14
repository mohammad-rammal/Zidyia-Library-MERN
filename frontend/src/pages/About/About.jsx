import "./about.css"
import image1 from '../../assets/images/about.png';
import feature1 from '../../assets/images/feature1.webp';
import feature2 from '../../assets/images/feature2.webp';
import feature3 from '../../assets/images/feature3.webp';
import feature4 from '../../assets/images/feature4.webp';
import feature5 from '../../assets/images/feature5.webp';
import feature6 from '../../assets/images/feature6.webp';
import image2 from '../../assets/images/about2.png';

const About = () => {
  return (
    <div className="about">
      <div className="rectangle1">
        <div className="rectangle1-title">About Zendy</div>
        <div className="rectangle1-text">Zendy was born from a simple vision: to make academic content more affordable and
          accessible for everyone. <br /><br />
          And we mean everyone. No matter where you’re from or what you’re interested in,
          Zendy’s Online Library helps you discover more about our world.</div>
        <div className="rectangle1-image"><img src={image1} alt="Phone" /></div>

        <div className="sign-up"></div>
        <div className="sign-up-text">Sign Up</div>
      </div>

      <div className="rect-2-and-3">
        <div className="rectangle-2">
          <div className="rectangle-2-title">Where can you find Zendy?</div>
          <div className="rectangle-2-text">Zendy Open, an online library providing <span style={{ color: '#5DD3B3', fontWeight: 'bold' }}>Open Access</span> content is available
            worldwide.<br />
            Zendy Plus is available in UAE, Saudi Arabia, Bahrain, Jordan, Algeria, Morocco, and Nigeria (more regions launching soon)!</div>
        </div>

        <div className="rectangle-3">
          <div className="rectangle-3-text">With library budgets shrinking & journal subscription costs increasing,
            individuals who require access to research are left with limited options.<br /><br />
            So, our founders created <span style={{ color: '#5DD3B3', fontWeight: 'bold' }}>Zendy</span> - an easy-to-use platform where you can find research across all major disciplines.<br /><br />
            Zendy is developed by Knowledge E in a growing collaboration with researchers, students, institutions,
            & publishers to facilitate the democratisation of knowledge.</div>
        </div>
      </div>

      <div className="tab">
        <div className="feature1">FEATURED ON</div>
        <div className="feature"><img src={feature1} alt="feature" /></div>
        <div className="feature"><img src={feature4} alt="feature" /></div>
        <div className="feature"><img src={feature3} alt="feature" /></div>
        <div className="feature"><img src={feature2} alt="feature" /></div>
        <div className="feature"><img src={feature6} alt="feature" /></div>
        <div className="feature"><img src={feature5} alt="feature" /></div>
      </div>

      <div className="rectangle-4">
        <div className="rectangle-4-1">
          <div className="reactangle-4-title">Why use Zendy?</div>
          <div className="rectangle-4-text">We make accessing research simple. Our powerful online library features millions
            of <span style={{ color: '#5DD3B3', fontWeight: 'bold' }}>articles, journals, e-books,</span> and more - all on a seamless platform.<br /><br />
            You can use comprehensive filters to narrow down your research and then <span style={{ color: '#5DD3B3', fontWeight: 'bold' }}>
              read, cite, and download</span> content with ease.</div>
        </div>
        <div className="reactangle-4-image"><img src={image2} alt="Computer" /></div>
      </div>

    </div>


  );
};

export default About;