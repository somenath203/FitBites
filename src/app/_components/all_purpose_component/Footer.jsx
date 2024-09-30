'use client';

const Footer = () => {
  return (
    <footer className="mt-16 flex items-center justify-center py-10 border-t">

        <p className="flex flex-col lg:flex-row items-center gap-2 lg:gap-3">

            <span>@ {new Date().getFullYear()}</span>
 
            <span className="hidden lg:block">|</span>

            <span>FitBites</span>

            <span className="hidden lg:block">|</span>

            <span>Somenath Choudhury</span>

        </p>

    </footer>
  );
};

export default Footer;
