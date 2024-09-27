const Footer = () => {
  return (
    <footer className="mt-16 flex items-center justify-center py-10 border-t">

        <p className="flex items-center gap-3">

            <span>@ {new Date().getFullYear()}</span>
 
            <span>|</span>

            <span>FitBites</span>

            <span>|</span>

            <span>Somenath Choudhury</span>

        </p>

    </footer>
  );
};

export default Footer;
