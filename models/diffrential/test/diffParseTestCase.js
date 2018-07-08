const path = require('path')
const fs = require('fs')

const getTestDataDirectory = () => {
    return  __dirname + '/data'   
}

const testParse = () => {
    const dir = getTestDataDirectory()
    fs.readdir(dir, (err, files) => {
        if (err) throw err
        files.forEach((fileName) => {
           if (/\.diff/.test(fileName)) {
                testFile(dir, fileName)
           } 
        }) 
    })
}
const testFile = (dir, fileName) => {
    const data = fs.readFile(dir + '/' + fileName, (err, data) => {
        if (err) throw err
        ['old, new'].forEach(item => {
            runParser(item, data, fileName, 'expect')
            runParser(item, data, fileName, 'unshielded')
            runParser(item, data, fileName, 'whitespace')
        })
    })
}

const runParser = (type, data, fileName, extension) => {
    const dir = getTestDataDirectory()
    const testFilePath = dir + '/' + fileName + '.' + type + '.' + extension
    fs.access(testFilePath, fs.constants.F_OK, (err) => {
        if (!err) {
            return
        }
        let unshielded = false;
        let whitespace = false;
        switch ($extension) {
          case 'unshielded':
            unshielded = true;
            break;
          case 'whitespace':
            unshielded = true;
            whitespace = true;
            break;
        }
        const parsers = buildChangesetParsers(type, data, fileName)
        const actual = renderParsers(parsers, unshielded, whitespace)
    })
}

const renderParsers = () => {
    $result = array();
    foreach ($parsers as $parser) {
      if ($unshield) {
        $s_range = 0;
        $e_range = 0xFFFF;
      } else {
        $s_range = null;
        $e_range = null;
      }

      if ($whitespace) {
        $parser->setWhitespaceMode(
          DifferentialChangesetParser::WHITESPACE_SHOW_ALL);
      }

      $result[] = $parser->render($s_range, $e_range, array());
    }
    return implode(str_repeat('~', 80)."\n", $result);    
}

const buildChangesetParsers = () => {
    $parser = new ArcanistDiffParser();
    $changes = $parser->parseDiff($data);

    $diff = DifferentialDiff::newFromRawChanges(
      PhabricatorUser::getOmnipotentUser(),
      $changes);

    $changesets = $diff->getChangesets();

    $engine = new PhabricatorMarkupEngine();
    $engine->setViewer(new PhabricatorUser());

    $parsers = array();
    foreach ($changesets as $changeset) {
      $cparser = new DifferentialChangesetParser();
      $cparser->setUser(new PhabricatorUser());
      $cparser->setDisableCache(true);
      $cparser->setChangeset($changeset);
      $cparser->setMarkupEngine($engine);

      if ($type == 'one') {
        $cparser->setRenderer(new DifferentialChangesetOneUpTestRenderer());
      } else if ($type == 'two') {
        $cparser->setRenderer(new DifferentialChangesetTwoUpTestRenderer());
      } else {
        throw new Exception(pht('Unknown renderer type "%s"!', $type));
      }

      $parsers[] = $cparser;
    }

    return $parsers;
}

// getTestDataDirectory()
testParse()
